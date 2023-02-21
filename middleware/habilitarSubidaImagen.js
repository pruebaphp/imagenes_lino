import multer from 'multer'
import path from 'path'
import { generarToken } from '../helpers/tokens.js'

const storage = multer.diskStorage({
    destination:function(request,file,callback){
        callback(null,'./public/uploads')
    },

    filename: function(request,file,callback){
        callback(null,generarToken()+path.extname(file.originalname))
    }

})

var upload = multer({storage})

export default upload