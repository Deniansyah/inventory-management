const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "upload"),
  filename: (req, file, cb) => {
    const randomNumber = Math.round(Math.random() * 90000)
    const filename = `${randomNumber}${Date.now()}${path.extname(
      file.originalname
    )}`
    cb(null, filename)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  }
})

// custom expressjs error response middleware
const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        success : false,
        message : "File size exceeded 2MB limit"
      })
    } else {
      res.status(400).json({
        success: false,
        message : err.message
      })
    }
  } else {
    res.status(500).json({
      success : false,
      message : err.message
    })
  }
}

module.exports = {
  upload,
  uploadErrorHandler,
}