import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

const userController = {
    getAll: async (req, res) => {
        try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
        } catch (e) {
        console.error("Error getAll users:", e);
        return res.status(400).json(e);
        }
    },

    createOne: async (req, res) => {
        const {
        nombre_Completo,
        email,
        telefono,
        ciudad,
        disponibilidad,
        habilidades,
        password,
        passwordConfirmation,
        } = req.body;

        const newArray = {
        nombre_Completo,
        email,
        telefono,
        ciudad,
        disponibilidad,
        habilidades,
        password,
        passwordConfirmation,
        };

        try {
        const newUser = await User.create(newArray);

        const saveToken = {
            nombre_Completo: newUser.nombre_Completo,
            email: newUser.email,
            id: newUser._id,
            tipo: newUser.tipo || "voluntario",
        };

        jwt.sign(saveToken, SECRET, { expiresIn: "15m" }, (err, token) => {
            if (err) {
            console.error("Error al generar token JWT en registro:", err);
            return res
                .status(500)
                .json({ error: "Error interno al generar token" });
            }
            return res.status(201).json({ token });
        });
        } catch (e) {
        console.error("Error createOne user:", e);
        const messages = {};

        if (e.name === "ValidationError") {
            Object.keys(e.errors).forEach((key) => {
            messages[key] = e.errors[key].message;
            });
        } else if (e.code === 11000) {
            messages.email = "El email ya está registrado";
        } else {
            messages.general = e.message || "Error desconocido al crear el usuario";
        }

        return res.status(400).json({ errors: messages });
        }
    },

    login: async (req, res) => {
        try {
        const { email, password } = req.body;
        console.log("BODY LOGIN USER:", req.body);

        // Validación básica
        if (!email || !password) {
            return res.status(400).json({
            errors: {
                email: !email ? "El email es obligatorio" : undefined,
                password: !password ? "La contraseña es obligatoria" : undefined,
            },
            });
        }

        const currentUser = await User.findOne({ email });

        if (!currentUser) {
            return res
            .status(401)
            .json({ errors: { email: "Credenciales inválidas" } });
        }

        const bcryptResponse = await bcrypt.compare(
            password,
            currentUser.password
        );

        if (!bcryptResponse) {
            return res
            .status(401)
            .json({ errors: { password: "Credenciales inválidas" } });
        }

        const saveToken = {
            nombre_Completo: currentUser.nombre_Completo,
            email: currentUser.email,
            id: currentUser._id,
            tipo: currentUser.tipo || "voluntario",
        };

        jwt.sign(saveToken, SECRET, { expiresIn: "15m" }, (err, token) => {
            if (err) {
            console.error("Error al generar token JWT en login:", err);
            return res
                .status(500)
                .json({ error: "Error interno al generar token" });
            }
            return res.status(200).json({ token });
        });
        } catch (e) {
        console.error("Error en login usuario:", e);
        return res.status(500).json({ error: "Error en el servidor" });
        }
    },
    };

export default userController;
