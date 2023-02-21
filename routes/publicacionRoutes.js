import express from 'express';
import {misImagenes,formularioNuevaImagen,formularioDropzone,almacenarImagen,crearPublicacion,obtenerPublicaciones,cerrarSesion,eliminarImagen,formularioEditarPublicacion,editarPublicacion} from '../controllers/publicacionController.js';
import upload from '../middleware/habilitarSubidaImagen.js'
import protegerRuta from '../middleware/protegerRuta.js';

const router = express.Router();

router.get('/mis-imagenes',protegerRuta,misImagenes);
router.get('/crear-imagen',protegerRuta,formularioNuevaImagen);
router.post('/crear-imagen',protegerRuta,upload.single('archivo'),crearPublicacion);
router.get('/api/mis-publicaciones',protegerRuta,obtenerPublicaciones);
router.get('/logout',cerrarSesion);
router.get('/eliminar-imagen/:id',protegerRuta,eliminarImagen)
router.get('/editar-publicacion/:id',protegerRuta,formularioEditarPublicacion)
router.post('/editar-publicacion/:id',protegerRuta,upload.single('archivo'),editarPublicacion)
//router.get('/insertar-imagen',formularioDropzone);
//router.post('/insertar-imagen',upload.single('imagen'),almacenarImagen);


export default router

