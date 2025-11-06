import { Timestamp } from "bson";
import { time } from "console";
import mongoose from "mongoose";
import { type } from "os";
import { title } from "process";

const songsSchema = mongoose.Schema(

    {   title : {
        type: String,
        minLength : [6, "El titulo debe superar los 6 caracteres"],
        maxLength : [255, "El titulo es muy largo"],
        required: [true, "El titulo es obligatorio"],

    },

        artist : {

        type: String,
        minLength : [10, "El nombre debe superar los 6 caracteres"],
        maxLength : [255, "El nombre es muy largo"],
        required: [true, "El artista es obligatorio"],
        },

        yearOfRelease : {
            type: Number,
            required : [true, "esta cancion tiene que tener un año" ],
            min : [1900, "esta cancion es muy vieja"],
            max : [2025, "esta cancion no puede ser del futuro"]
        },

        genre : {
            type: String ,
            required : [true, "tu tienes que poner un genero"]
        }
    },
        {timestamp : true}

)

const Songs = mongoose.model("Songs", songsSchema)

export default Songs;