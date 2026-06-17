import { Fundacion } from "../models/fundacion.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

const fundacionController = {
    getAll: async (req, res) => {
        try {
        const allFundaciones = await Fundacion.find();
        return res.status(200).json(allFundaciones);
        } catch (e) {
        console.error(e);
        return res.status(400).json(e);
        }
    },

    // REGISTRO
    createOne: async (req, res) => {
        const {
        nombre,
        cuit,
        contacto,
        correo,
        telefono,
        descripcion,
        contraseña,
        passwordConfirmation,
        } = req.body;

        const newData = {
        nombre,
        cuit,
        contacto,
        correo,
        telefono,
        descripcion,
        password: contraseña,
        passwordConfirmation,
        };

        try {
        const newFundacion = await Fundacion.create(newData);

        
        const saveToken = {
            id: newFundacion._id,
            nombre: newFundacion.nombre,
            correo: newFundacion.correo,
            cuit: newFundacion.cuit,
            tipo: newFundacion.tipo || "fundacion",
        };

        jwt.sign(saveToken, SECRET, { expiresIn: "15m" }, (err, token) => {
            if (err) {
            return res
                .status(500)
                .json({ error: "Error al generar el token" });
            }
            return res.status(201).json({ token });
        });
        } catch (e) {
        console.error("Error al crear fundación:", e);

        if (e.name === "ValidationError") {
            const messages = {};
            Object.keys(e.errors).forEach((key) => {
            messages[key] = e.errors[key].message;
            });
            return res.status(400).json({ errors: messages });
        }

        if (e.code === 11000) {
            const errors = {};
            if (e.keyPattern?.correo) {
            errors.correo = "El correo ya está registrado";
            }
            if (e.keyPattern?.cuit) {
            errors.cuit = "El CUIT ya está registrado";
            }
            return res.status(400).json({ errors });
        }

        return res.status(500).json({
            message: "Error interno al crear la fundación",
            error: e.message,
        });
        }
    },

    // LOGIN
    login: async (req, res) => {
        const { correo, contraseña } = req.body;

        try {
        const currentFundacion = await Fundacion.findOne({ correo });
        if (!currentFundacion) {
            return res
            .status(404)
            .json({ errors: { correo: "El correo no existe" } });
        }

        const bcryptResponse = await bcrypt.compare(
            contraseña,
            currentFundacion.password
        );

        if (!bcryptResponse) {
            return res
            .status(404)
            .json({ errors: { contraseña: "Las credenciales no coinciden" } });
        }

        const saveToken = {
            id: currentFundacion._id,
            nombre: currentFundacion.nombre,
            correo: currentFundacion.correo,
            cuit: currentFundacion.cuit,
            tipo: currentFundacion.tipo || "fundacion", 
        };

        jwt.sign(saveToken, SECRET, { expiresIn: "15m" }, (err, token) => {
            if (err) {
            return res
                .status(500)
                .json({ error: "Error al generar el token" });
            }
            return res.status(200).json({ token });
        });
        } catch (e) {
        console.error("Error en login fundación:", e);
        return res.status(500).json({ error: "Error en el servidor" });
        }
    },
};

export default fundacionController;
