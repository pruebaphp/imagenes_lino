import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Publicacion = db.define('publicaciones',{
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true,
    },

    imagen:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    titulo:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    descripcion:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    
    categoria:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    publicado:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
    
})

export default Publicacion;