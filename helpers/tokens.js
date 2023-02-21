import jwt from 'jsonwebtoken';

const generarToken = ()=>{
    const codigo = Math.random().toString(32).slice(3)+Date.now().toString(32)+Math.random().toString(32).slice(3)
    return codigo;
}

const generarJWT = (id,nombre)=>{
    return jwt.sign({ 
        id,
        nombre,
      }, process.env.JWT_SECRET, { expiresIn: '2d'});
}

export {
    generarToken,
    generarJWT,
}