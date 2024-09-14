import multer from "multer";

export const storage = multer.diskStorage({
    destination : (request,file,callback) => {
        callback(null , './uploads')
    },
    filename : (request,file,callback) => {
        callback(null , `${Date.now()} + '-' + ${file.originalname}`)
    }
})

export const fileFilter = (request,file,callback) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        callback(null , true)
    }
    else{
        callback(null, false);
    }
}

export const fileSize = 1024 * 1024 * 2;