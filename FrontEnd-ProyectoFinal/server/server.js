import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/dataBase.js";
import rutaDestinos from "./rutas/rutaDestinos.js";

import cors from "cors"
import rutaUsuario from "./rutas/rutaUsuario.js";


dotenv.config();

const app= express();
const PUERTO= process.env.PUERTO || 8081;



app.use(express.json());
app.use (express.urlencoded({extended : true}));
app.use(cors())
 


connectDB();

app.use("/api/destinos", rutaDestinos);

app.use("/api/usuario", rutaUsuario);

app.listen( PUERTO, ()=>{
    console.log (`Server ON en el puerto ${PUERTO}`)
})



