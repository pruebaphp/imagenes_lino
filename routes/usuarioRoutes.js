import express from "express";
import {formularioRegistro,registrarUsuario,formularioLogin,formularioOlvidoPass,formularioConfirmarCuenta,loginUsuario} from '../controllers/usuarioController.js'
import upload from '../middleware/habilitarSubidaImagen.js'

const router = express.Router();

router.get('/registro',formularioRegistro);
router.post('/registro',registrarUsuario);
router.get('/login',formularioLogin);
router.post('/login',loginUsuario);
router.get('/olvido-password',formularioOlvidoPass);
router.get('/confirmar-cuenta/:token',formularioConfirmarCuenta);



export default router