import Usuario from '../models/usuarioModel.js';
import {check,validationResult} from 'express-validator'
import { generarToken,generarJWT } from '../helpers/tokens.js';
import {enviarEmailRegistro} from '../helpers/emails.js'

const formularioRegistro = (request,response)=>{
    response.render('autenticacion/registro',{
        pagina:'Registro',
        css:'/css/app.css',
        datos:request.body,
    })
}

const registrarUsuario = async (request,response)=>{
    //console.log(request.body);

    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(request);
    await check('email').isEmail().withMessage('Ingrese un email correcto').run(request);
    await check('password').isLength({min:7}).withMessage('La contraseña debe tener almenos 7 caractéres').run(request);
    await check('repeat_password').equals(request.body.password).withMessage('Las contraseñas deben ser iguales').run(request);

    const resultado = validationResult(request);

    if(!resultado.isEmpty()){
        return response.render('autenticacion/registro',{
            errores:resultado.array(),
            pagina:'Registro',
            css:'/css/app.css',
            datos:request.body,
        })
    }



    const {nombre,email,password} = request.body;

    const usuario = await Usuario.findOne({where:{
        email,
    }})

    console.log(usuario);



    if(usuario){
        return response.render('autenticacion/registro',{
            errores: [{msg:'El correo ingresado ya existe'}],
            pagina:'Registro',
            css:'/css/app.css',
            datos:request.body,
        })
    }

    if(usuario?.confirmado==0){
        return response.render('autenticacion/registro',{
            errores: [{msg:'Debes activar tu cuenta'}],
            pagina:'Registro',
            css:'/css/app.css',
            datos:request.body,
        })
    }

    

    const usuarioCreado= await Usuario.create({
        nombre,
        email,
        password,
        token: generarToken(),
        confirmado: 0,
    })

    

    enviarEmailRegistro(usuarioCreado.token);
    response.render('templates/mensaje',{
        pagina:'Confirma tu cuenta',
        css: '/css/confirmar-cuenta.css',
    })

    
}

const formularioLogin = async (request,response)=>{
    response.render('autenticacion/login',{
        pagina:'Iniciar sesión',
        css:'/css/login.css',
    })
}

const loginUsuario = async (request,response)=>{

    await check('email').isEmail().withMessage('Eso no parece un email').run(request);
    await check('password').notEmpty().withMessage('Ingrese una contraseña').run(request);

    const resultado = validationResult(request);

    if(!resultado.isEmpty()){
       return response.render('autenticacion/login',{
            pagina:'Iniciar sesión',
            css:'/css/login.css',
            errores: resultado.array(),
            datos:request.body,
        })
    }

    //verificar si existe el usuario
    const {email, password} = request.body;

    const usuario = await Usuario.findOne({where:{
        email,
    }})

    
    if(!usuario){
        return response.render('autenticacion/login',{
            pagina:'Iniciar sesión',
            css:'/css/login.css',
            errores: [{msg:'Credenciales incorrectas'}],
            datos:request.body,
        })
    }

    if(!usuario.verificarPassword(password)){
        return response.render('autenticacion/login',{
            pagina:'Iniciar sesión',
            css:'/css/login.css',
            errores: [{msg:'Credenciales incorrectas'}],
            datos:request.body,
        })
    };

   
    return response.cookie('_jwt',generarJWT(usuario.id, usuario.nombre)).redirect('/mis-imagenes');

}

const formularioOlvidoPass = async (request,response)=>{
    response.render('autenticacion/olvido-password',{
        pagina:'Recupera tu cuenta',
        css:'/css/olvido-password.css',
    })
}

const formularioConfirmarCuenta = async (request,response)=>{

    const {token} = request.params;

    const usuario = await Usuario.findOne({where:{
        token,
    }})


    if(!usuario){
        return response.redirect('/login')
    }

    //Si existe el usuario, eliminar token y actualizar estado de confirmado

    usuario.token = '';
    usuario.confirmado = 1;

    await usuario.save();
    
    response.render('templates/confirmar-cuenta',{
        css: '/css/confirmar-cuenta.css',
        pagina: 'Confirmación de cuenta',
    })
}



export{
    formularioRegistro,
    registrarUsuario,
    formularioLogin,
    formularioOlvidoPass,
    formularioConfirmarCuenta,
    loginUsuario,

}