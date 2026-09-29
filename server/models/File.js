import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    size: {
        type: Number,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        default: null,
    },
    storageKey: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

fileSchema.index({ owner: 1, folder: 1, name: 1 }, { unique: true });

const File = mongoose.model("File", fileSchema);

export default File;