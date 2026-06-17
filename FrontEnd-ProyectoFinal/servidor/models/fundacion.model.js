import mongoose from "mongoose";
import bcrypt from "bcrypt";

const fundacionSchema = new mongoose.Schema(
    {
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    cuit: {
        type: Number,
        required: [true, "El CUIT es obligatorio"],
        minlength: [11, "El CUIT debe tener 11 digitos"],
        unique : true
    },
    contacto: {
        type: String,
        required: [true, "El nombre del contacto es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique : true
    },
    telefono: {
        type: Number,
        required: [true, "El teléfono es obligatorio"],
        minlength: [10, "El teléfono debe tener como mínimo 10 digitos"],
    },
    descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    },
    tipo: {
        type: String,
        enum: ["fundacion"],  
        default: "fundacion",
        required: true,
    },
    },
    { timestamps: true }
);


fundacionSchema
    .virtual("passwordConfirmation")
    .get(function () {
    return this._passwordConfirmation;
    })
    .set(function (value) {
    this._passwordConfirmation = value;
    });

fundacionSchema.pre("validate", function () {
    if (this.password !== this.passwordConfirmation) {
    this.invalidate(
        "passwordConfirmation",
        "La contraseña y la confirmación no coinciden"
    );
    }
});


fundacionSchema.pre("save", async function () {

    if (!this.isModified("password")) return;

    const encryptedPass = await bcrypt.hash(this.password, 10);
    this.password = encryptedPass;
});

const Fundacion = mongoose.model("fundacion", fundacionSchema);

export { Fundacion, fundacionSchema };
