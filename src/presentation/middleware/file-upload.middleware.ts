import multer from 'fastify-multer'
import fs from 'fs'


const configStoreMulter = multer.diskStorage({
    destination(req: any, file: any, callback: any) {
        const dirnameFolderDate = `C:/Users/base/Documents/Traffix/back-end/fastify-app/public`
        const isExistFolderDateNow = fs.existsSync(dirnameFolderDate)
        if (!isExistFolderDateNow) {
            fs.mkdirSync(dirnameFolderDate)
        }

        callback(null, dirnameFolderDate);
    },
    filename(req: any, file: any, callback: any) {
        const convertFileName = Date.now() + '_' + file.originalname.split(' ').join('_')
        callback(null, convertFileName);
    },
})

const handleSaveFile = () => {

}

export const uploadFileWithMulter: any = multer({
  dest: process.env.ROOT_PATH_UPLOAD_FILE,
  storage: configStoreMulter,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req: any, file: any, callback: any) => {
    if (!file) {
      return callback(null, false);
    }
    if (!new RegExp('(jpg|png|jpeg)$', 'i').test(file.mimetype)) {
      return callback(null, false);
    }

    callback(null, true);
  },
});

