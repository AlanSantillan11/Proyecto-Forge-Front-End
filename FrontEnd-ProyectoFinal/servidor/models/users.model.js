import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        nombre_Completo: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [3, "El nombre debe superar los 3 caracteres"],
        },
        email: {
        type: String,
        required: [true, "El mail es obligatorio"],
        unique: true,
        },
        telefono: {
        type: Number,
        required: [true, "El telefono es obligatorio"],
        },
        ciudad: {
        type: String,
        required: [true, "La ciudad es obligatoria"],
        minlength: [4, "La ciudad debe superar los 4 caracteres"],
        },
        disponibilidad: {
        type: String,
        required: [true, "La disponibilidad es obligatoria"],
        },
        habilidades: {
        type: [String],
        required: [true, "Las habilidades son obligatorias"],
        },
        password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [8, "La contraseña debe superar los 8 caracteres"],
        },
        tipo: {
        type: String,
        enum: ["voluntario"],
        default: "voluntario",
        required: true,
        },
    },
    { timestamps: true }
    );

    userSchema
    .virtual("passwordConfirmation")
    .get(function () {
        return this._passwordConfirmation;
    })
    .set(function (value) {
        this._passwordConfirmation = value;
    });

    userSchema.pre("validate", function (next) {
    if (this.password !== this.passwordConfirmation) {
        this.invalidate(
        "passwordConfirmation",
        "La contraseña y la confirmación no coinciden"
        );
    }
    next();
});

userSchema.pre("save", function (next) {

    if (!this.isModified("password")) return next();

    bcrypt.hash(this.password, 10).then((encryptedPass) => {
        this.password = encryptedPass;
        next();
    });
});

const User = mongoose.model("users", userSchema);

export { User, userSchema };
