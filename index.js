import express from 'express';
import db from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js';
import publicacionRoutes from './routes/publicacionRoutes.js'
import cookieParser from 'cookie-parser'

//creando la applicacion

const app = express();

//habilitar la lectura de formularios

app.use(express.urlencoded({extended:true}))

//conectandonos a la base de datos

try {
    await db.authenticate();
    db.sync();
    console.log('Conexion a la base de datos exitosa');
} catch (error) {
    console.log(error);
}  

//Asignando configuracion

app.set('view engine','pug');
//asignando la carpeta de vistas
app.set('views','./views');

//Usar la carpeta publica

app.use(express.static('public'));

//Habilitar las cookiees

app.use(cookieParser());

//Los routings

app.use('/',usuarioRoutes);
app.use('/',publicacionRoutes);


const port = 3000;

app.listen(port,()=>{
    console.log(`El servidor está funcionando en el puerto ${port}`)
})