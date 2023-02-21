import {Publicacion,Usuario} from '../models/relaciones.js';
import db from '../config/db.js';

const eliminarYcrear = ()=>{
    try {
        db.sync({force:true})
        console.log('Eliminando.... Creando...');
    } catch (error) {
        console.log(error)
    }
    
}

eliminarYcrear();