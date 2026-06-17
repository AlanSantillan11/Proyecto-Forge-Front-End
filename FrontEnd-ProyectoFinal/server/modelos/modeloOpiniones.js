import { mongoose } from "mongoose";

const opinionSchema = mongoose.Schema(
    {
        opinion: {type : String,
            required : [true, "Proporciona una opinion para compartir"]
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usuario", 
            required: true
        }
    }, { timestamps: true }
);

const Opinion = mongoose.model("opinion",opinionSchema);

export {Opinion, opinionSchema} ;