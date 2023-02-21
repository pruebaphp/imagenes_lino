import Publicacion from './publicacionModel.js';
import Usuario from './usuarioModel.js';

Publicacion.belongsTo(Usuario);


export{
    Publicacion,
    Usuario,
}