import multer from 'multer'
import path from 'path'


const storage = multer.memoryStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)

        const name = `${Date.now()}-${Math.floor(Math.random() * 1E9)}${ext}`

        cb(null, name)
    }
    
})

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }
})

export default upload 