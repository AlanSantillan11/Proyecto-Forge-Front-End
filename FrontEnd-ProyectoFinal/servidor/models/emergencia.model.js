import mongoose from "mongoose";


const emergenciaSchema = new mongoose.Schema(
    {
    titulo: {
        type: String,
        required: [true, "El titulo es obligatorio"],
        minlength: [5, "El titulo debe tener 5 caracteres"],
    },
    fundacion: {
        type: mongoose.Schema.ObjectId,
        ref: "fundacion",
        required: [true, "Debes indicar la fundacion de esta emergencia"],
    },
    cantidad_personas: {
        type: Number,
        required: [true, "La cantidad de personas es obligatorio"],
    },
    ciudad: {
        type: String,
        required: [true, "La ciudad es obligatoria"],
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"],
        minlength: [10, "La descripcion debe tener 10 caracteres"],
    },
    habilidades: {
        type: String,
        required: [true, "Las habilidades son obligatorias"],
        minlength: [5, "Las habilidades deben tener 5 caracteres"],
    },
    voluntarios: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "users",
        },
    ],
    },
    { timestamps: true }
);

const Emergencia = mongoose.model("emergencia", emergenciaSchema);


export { Emergencia, emergenciaSchema };