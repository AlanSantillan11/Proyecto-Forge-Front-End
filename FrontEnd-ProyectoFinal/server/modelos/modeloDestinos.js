import mongoose from "mongoose";
import { opinionSchema } from "./modeloOpiniones.js";


const modeloDestinos = mongoose.Schema({
    lugar: {
      type: String,
      required: [true, "Por favor proporciona el lugar"],
      minlength: [3, "El lugr debe tener al menos 3 caracteres"],
      unique: true
    },
    descripcion: {
      type: String,
      required : [true, "Proporciona la descripción del foro"],
      minlength:  [10, "El tiempo de preparacion debe ser mayor a un minuto"],
    },
    tips: {
      type: String,
      required: [true, "Proporciona los tips viajeros"],
      minlength:[ 10, "Los tips deben tener al menos 10 caracteres"],
    },
    epoca: {
      type: String,
      required: [true, "Selecciona la mejor época para viajar"],
      enum: ["Verano", "Otoño", "Invierno", "Primavera", "Todo el año"],
    },
    costo:{
      type:Number,
      required: [true, "Proporciona el costo"],
      min:[0, "El costo no puede ser negativo"]
    },
    autor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuario",
    required: [true, "Agrega un autor"]
    },
    opinion: [opinionSchema]
  },
  { timestamps: true }
);

const Destinos= mongoose.model("destinos", modeloDestinos)

export {Destinos, modeloDestinos};




