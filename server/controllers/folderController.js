import Folder from "../models/Folder.js"

export async function createFolder(req, res) {
    const { name, parent } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: "name is required"})
        }
        if (parent) {
            const parentFolder = await Folder.findOne({
                _id: parent,
                owner: req.userId,
            });
            if (!parentFolder) {
                return res.status(404).json({ message: "Parent Folder not found"})
            }
        }
        
        const folder = await Folder.create({
            name,
            parent: parent || null,
            owner: req.userId,
        });

        return res.status(201).json({
            id: folder._id,
            name: folder.name,
            parent: folder.parent,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "A Folder with that name already exists here" });
        }
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid parent id" });
        }
        console.log("Error creating folder", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getFolders(req, res) {
    const { parent } = req.query;

    try {
        const folders = await Folder.find({
            owner: req.userId,
            parent: parent || null,
        }).sort({ name: 1 });

        return res.status(200).json(
            folders.map((f) => ({
                id: f._id,
                name: f.name,
                parent: f.parent,
            }))
        );
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid parent id" });
        }
        console.log("Error fetching folders:", error);
        return res.status(500).json({ message: "Internal Server Error"});
    }
}