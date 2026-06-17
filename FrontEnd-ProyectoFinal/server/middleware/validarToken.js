import jwt from "jsonwebtoken"

const TOPSECRET= process.env.TOPSECRET;

const validarToken=(req, res, next)=>{

    const {token_usuario}= req.headers;
    jwt.verify( token_usuario,TOPSECRET, (err, decoded)=>{
        if(err){
            return res.status(406).json({message: "No permitido"})
        }
        req.infoUsuario=decoded
        next()
    })
}


export default validarToken