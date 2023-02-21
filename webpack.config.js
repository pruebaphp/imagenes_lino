import path from 'path'

export default {
    mode: 'development',
    entry:{
      
        agregarImagen : './src/js/agregarImagen.js',
        asignarNombreRuta : './src/js/asignarNombreRuta.js',
        cargarCards : './src/js/cargarCards.js',
      

    },
    output:{
        filename: '[name].js',
        //esto es una ruta absoluta EJMP: http://localhost:3000/public/js o http://google.com/public/js
        path: path.resolve('public/js')
    }
}