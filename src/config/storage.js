import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `Storage/${req.params.dirname}`)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname))
  }
})

export default multer({ storage })
