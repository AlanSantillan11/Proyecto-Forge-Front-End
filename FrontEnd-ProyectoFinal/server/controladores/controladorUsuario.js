import {Usuario} from "./../modelos/modeloUsuarios.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config()

const TOPSECRET= process.env.TOPSECRET;


const controladorUsuario={  
    getAll: async (req, res)=> {
        try{
            const todosLosUsuarios=await Usuario.find()
            return res.status(200).json(todosLosUsuarios)
        }catch (e){
            return res.status(400).json (e)
        }
    },
    createOne: async (req, res)=> {
        const {primerNombre, apellido, email, contraseña, confirmarContraseña} = req.body;
        const nuevoArray = {primerNombre, apellido, email, contraseña, confirmarContraseña} 
        try{
            const nuevoUsuario= await Usuario.create(nuevoArray)

            const guardarToken= {
                primerNombre: nuevoUsuario.primerNombre, 
                apellido: nuevoUsuario.apellido, 
                email: nuevoUsuario.email, 
                id: nuevoUsuario._id
            }
            jwt.sign(guardarToken, TOPSECRET, {expiresIn:"10min"},(err,token)=>{
                return res.status(201).json({token})
            })

        }catch(e){
            const message= {}
                if (e.name ==="ValidationError"){
                    Object.keys(e.errors).forEach(key => {
                        message[key]= e.errors[key].message
                    });
                }
            return res.status(400).json({errors : {...message}})
        }
    }, 
    login: async (req, res)=>{
        const {email,contraseña}=req.body;

        const usuarioActual= await Usuario.findOne({email});
            if(!usuarioActual){
                return res.status(404).json({errors : {email: "El email es incorrecto"}})
            }

        const bcryptRespuesta= await bcrypt.compare(contraseña, usuarioActual.contraseña)
            if(!bcryptRespuesta){
                return res.status(404).json({errors : {contraseña: "Las contraseñas no coinciden"}})
            }


        const guardarToken= { 
            primerNombre: usuarioActual.primerNombre,
            apellido: usuarioActual.apellido,
            email: usuarioActual.email, 
            id: usuarioActual._id
        }
        jwt.sign(guardarToken, TOPSECRET, {expiresIn:"10min"},(err,token)=>{
                return res.status(201).json({token})
        })
    }
}





export default controladorUsuario