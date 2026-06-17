import {mongoose,  mongo} from "mongoose"
import bcrypt from "bcrypt"

const modeloUsuario = mongoose.Schema(
    {
        primerNombre: {
            type: String,
            required: [ true, "Este campo es obligatorio"],
            minlength: [3, "Debe contener minimo 3 caracteres"]
        },
        apellido: {
            type: String,
            required: [ true, "Este campo es obligatorio"],
            minlength: [3, "Debe contener minimo 3 caracteres"]
        },
        email: {
            type: String,
            required: [ true, "Este campo es obligatorio"],
            minlength: [3, "Debe contener minimo 3 caracteres"],
            unique: true
        },
        contraseña:{
            type: String,
            required: [ true, "Este campo es obligatorio"],
            minlength: [8, "Debe contener minimo 8 caracteres"]
        }

    }, { timestamps: true }
)

modeloUsuario.virtual("confirmarContraseña").get(
    function(){
        return this._confirmarContraseña
    }
).set(function(value){
    this._confirmarContraseña= value
})

modeloUsuario.pre("validate", function(next){
    if (this.contraseña !== this.confirmarContraseña){
        this.invalidate("confirmarContraseña", "las contraseñas no coinciden")
    }
    next();
})


modeloUsuario.pre("save", function(next){
    bcrypt.hash(this.contraseña, 10).then((contraseñaEncriptada)=>{
        this.contraseña = contraseñaEncriptada;
        next();
    })
})




const Usuario= mongoose.model("usuario", modeloUsuario)



export {Usuario, modeloUsuario}