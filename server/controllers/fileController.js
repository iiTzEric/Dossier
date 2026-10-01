import { r2Client } from "../config/r2.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Folder from "../models/Folder.js";
import { randomUUID } from "crypto";
import File from "../models/File.js";

export async function getUploadUrl(req, res) {
  const { name, size, mimeType, folder } = req.body;

  try {
    if (!name || !size || !mimeType) {
        return res.status(400).json({ message: "name, size, and mimeType are required"})
    }
    if (folder) {
        const existingFolder = await Folder.findOne({
            _id: folder,
            owner: req.userId,
        });

        if (!existingFolder) {
            return res.status(404).json({ message: "Folder not found" });
        }
    }
    const storageKey = `${ req.userId }/${ randomUUID() }-${ name }`
    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: storageKey,
        ContentType: mimeType
    });

    const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 300 })
    return res.status(200).json({ uploadUrl, storageKey });

  } catch (error) {
    console.log("Error preparing upload:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function confirmUpload(req, res) {
    const { name, size, mimeType, folder, storageKey } = req.body;
    
    try {
        if (!name || !size || !mimeType || !storageKey) {
            return res.status(400).json({ message: "name, size, mimeType, and storageKey are required" });
        }

        if (folder) {
            const existingFolder = await Folder.findOne({
                _id: folder,
                owner: req.userId,
            });

            if (!existingFolder) {
                return res.status(404).json({ message: "Folder not found" });
            }
        }
        if (!storageKey.startsWith(`${req.userId}/`)) {
            return res.status(403).json({ message: "Invalid Storage Key" });
        }
        const file = await File.create({
            name,
            size,
            mimeType,
            folder: folder || null,
            owner: req.userId,
            storageKey
        });

        return res.status(201).json({
            id: file._id,
            name: file.name,
            size: file.size,
            mimeType: file.mimeType,
            folder: file.folder,
            storageKey: file.storageKey
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "A File with that name already exists here" });
        }
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid folder id" });
        }
        console.log("Error confirming upload", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}