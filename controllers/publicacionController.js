import {Publicacion,Usuario} from '../models/relaciones.js'
import {check, validationResult} from 'express-validator'

const misImagenes = async (request,response)=>{

    const {pagina:paginaActual} = request.query;

    console.log(paginaActual);

    const expresionRegular = /^[0-9]$/

    if(!expresionRegular.test(paginaActual)){
        return response.redirect('/mis-imagenes?pagina=1');
    }

    const {id} = request.usuario;
    const limite = 6;
    const offset = ((paginaActual*limite)-limite);

    const [publicaciones,total] = await Promise.all([
        Publicacion.findAll({
            limit:limite,
            offset,
            where:{usuarioId:id,
            }}),
        Publicacion.count({where:{usuarioId:id}}),
    ])

   
    return response.render('publicacion/mis-imagenes',{
        pagina: 'imagenes',
        css: '/css/mis-imagenes.css',
        nombreUsuario: request.usuario.nombre,
        paginas: Number(Math.ceil(total/limite)),
        paginaActual: Number(paginaActual),
        publicaciones,

    });
}

const formularioNuevaImagen = async (request,response)=>{

    

    response.render('publicacion/crear-imagen',{
        pagina: 'Crear imagen',
        css: '/css/crear-imagen.css'
    })
}

const formularioDropzone = async (request,response)=>{
    response.render('publicacion/insertar-imagen',{
        pagina: 'Insertar imagen',
        css: '/css/insertar-imagen.css'
    })
}

const almacenarImagen = async (request,response)=>{
    return response.redirect('/mis-imagenes')
}

const crearPublicacion = async(request,response)=>{
    //validar campos
    await check('titulo').notEmpty().withMessage('El título no puede ir vacío').run(request);
    await check('descripcion').notEmpty().withMessage('La descripción no puede ir vacia').run(request);
    await check('categoria').notEmpty().withMessage('Seleccione una categoría').run(request);
   // await check('rutaImagenToken').notEmpty().withMessage('Selecciona una imagen').run(request);
    
    const resultado = validationResult(request);
    //validar Imagen


    request.existeImagen = request.file?.originalname;

    if(request.existeImagen==undefined){

        resultado.errors.push({msg:'Seleccione una imagen'})
    }else{
        request.rutaAux = request.existeImagen;
    }

    
    console.log(request.rutaAux);

    if(!resultado.isEmpty()){
        return response.render('publicacion/crear-imagen',{
            pagina: 'Publicar imagen',
            css: '/css/crear-imagen.css',
            errores: resultado.array(),
            datos: request.body,
            //imagen: request.rutaAux,

        });
    }

    const {titulo,descripcion,categoria} = request.body;

    const {id:usuarioId} = request.usuario;
    //console.log(`E S T E  ------- E S ---- E L --- I D: ${usuarioId}`);
    
    await Publicacion.create({
        imagen: request.file?.filename,
        titulo,
        descripcion,
        categoria,
        publicado:true,
        usuarioId,
    })

    return response.redirect('/mis-imagenes');

}

const obtenerPublicaciones = async(request,response)=>{
    const publicaciones = await Publicacion.findAll({where:{
        usuarioId: request.usuario.id,
    }})

    response.json(publicaciones);
}

const cerrarSesion = async(request,response)=>{
    response.clearCookie('_jwt').redirect('/login');
}

const eliminarImagen = async(request,response)=>{
    const {id} = request.params;

    console.log(id);

    //validar Id

    const publicacion = await Publicacion.findByPk(id);

    if(!publicacion){
        return response.redirect('/mis-imagenes');
    }

    if(publicacion.usuarioId!=request.usuario.id){
        return response.redirect('/mis-imagenes');
    }

    await publicacion.destroy();

    return response.redirect('/mis-imagenes');

}

const formularioEditarPublicacion = async(request,response)=>{
    const {id} = request.params;

        //validar si existe el id

        const publicacion = await Publicacion.findByPk(id);

        if(!publicacion){
            return response.redirect('/mis-imagenes');
        }

      //  console.log(publicacion);

        if(publicacion.usuarioId!=request.usuario.id){
            return response.redirect('/mis-imagenes');
        }
        
        response.render('publicacion/editar-publicacion',{
            pagina: 'Edita tu publicación',
            datos: publicacion,
            css: '/css/crear-imagen.css',

        })
    
}

const editarPublicacion = async(request,response)=>{
    const {id} = request.params;

    //validar si existe el id

    const publicacion = await Publicacion.findByPk(id);

    if(!publicacion){
        return response.redirect('/mis-imagenes');
    }

    console.log(publicacion);

    if(publicacion.usuarioId!=request.usuario.id){
        return response.redirect('/mis-imagenes');
    }

    //validar campos
       await check('titulo').notEmpty().withMessage('El título no puede ir vacío').run(request);
       await check('descripcion').notEmpty().withMessage('La descripción no puede ir vacia').run(request);
       await check('categoria').notEmpty().withMessage('Seleccione una categoría').run(request);
    // await check('rutaImagenToken').notEmpty().withMessage('Selecciona una imagen').run(request);
       
    const resultado = validationResult(request);
    //validar Imagen
    let asignarImagen = true;
    if(request.file?.filename==undefined){
        asignarImagen = false;
    }

    

    if(!resultado.isEmpty()){
        return response.render('publicacion/editar-publicacion',{
            pagina: 'Editar tu publicación',
            css: '/css/crear-imagen.css',
            errores: resultado.array(),
            datos: request.body,
            
        });
    }

    const {titulo,descripcion,categoria} = (request.body);

    publicacion.titulo = titulo;
    publicacion.descripcion = descripcion;
    publicacion.categoria = categoria;

    if(asignarImagen){
        publicacion.imagen = request.file.filename;
    }

    publicacion.save();

    return response.redirect('/mis-imagenes');

   
}

export{
    misImagenes,
    formularioNuevaImagen,
    formularioDropzone,
    almacenarImagen,
    crearPublicacion,
    obtenerPublicaciones,
    cerrarSesion,
    eliminarImagen,
    formularioEditarPublicacion,
    editarPublicacion,
}