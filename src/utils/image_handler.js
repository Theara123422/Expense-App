import multer from "multer";

const storage = multer.diskStorage({
    destination : (request,file,callback) => {
        callback(null , './uploads')
    },
    filename : (request,file,callback) => {
        callback(null , `${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (request,file,callback) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        callback(null , true)
    }
    else{
        callback(null, false);
    }
}

const fileSize = 1024 * 1024 * 2;

//wrap up multer configuration
export const upload = multer({
    storage,
    fileFilter,
    limits : {
        fileSize
    }
})