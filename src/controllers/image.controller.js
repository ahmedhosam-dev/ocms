import mongoose from "mongoose"
import { GridFSBucket } from "mongodb"

let gfs
const conn = mongoose.connection

conn.once("open", () => {
  gfs = new GridFSBucket(conn.db, {
    bucketName: "images",
  })
})

export const uploadImage = (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.status(201).json({ filename: req.file.filename });
}

export const getImage = async (req, res) => {
    try {
        const file = await conn.db.collection("images.files").findOne({ filename: req.params.filename });
        if (!file) return res.status(404).json({ error: "Image not found" });

        res.set("Content-Type", file.contentType);
        const readStream = gfs.openDownloadStreamByName(req.params.filename);
        readStream.pipe(res);
    } catch (error) {
        console.error("Get Image Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteImage = async (req, res) => {
    try {
        const file = await conn.db.collection("images.files").findOne({ filename: req.params.filename });
        if (!file) return res.status(404).json({ error: "Image not found" });

        await gfs.delete(file._id);
        res.status(200).json({ message: "Image deleted" });
    } catch (error) {
        console.error("Delete Image Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};