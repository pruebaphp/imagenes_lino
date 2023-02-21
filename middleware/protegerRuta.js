import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarioModel.js';

const protegerRuta = async(request,response,next)=>{

const {_jwt} = request.cookies;
if(!_jwt){
    return response.redirect('/login');
}

try {

    const decoded = jwt.verify(_jwt,process.env.JWT_SECRET);
    const usuario = await Usuario.findByPk(decoded.id);

    if(!usuario){
        return response.redirect('/login');
        
        
    }else{
        request.usuario = usuario;
        return next();
    }   

    

} catch (error) {
    response.clearCookie('_jwt').redirect('/mis-imagenes');
}

}

export default protegerRuta;