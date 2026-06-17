import {connect} from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const DB= process.env.DB

const connectDB= async ()=>{
    try{
        await connect (DB)
        console.log("Base de Datos ON")
    }
    catch(e){
        console.log("Se encontro un error")
    }
}

export default connectDB;