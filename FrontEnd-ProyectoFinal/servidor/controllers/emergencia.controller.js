    import { Emergencia } from "../models/emergencia.model.js";

    const emergenciaController = {

    getAll: async (req, res) => {
        try {
        const emergencia = await Emergencia.find().populate("fundacion");
        
        return res.status(201).json(emergencia);
        } catch (e) {
        return res.status(400).json(e);
        }
    },


    createOne: async (req, res) => {
        console.log("infoUser en createOne:", req.infoUser);

        const {
        titulo,
        fundacion,           
        cantidad_personas,
        ciudad,
        descripcion,
        habilidades,
        } = req.body;

        const newArray = {
        titulo,
        cantidad_personas,
        ciudad,
        descripcion,
        habilidades,
        };

        if (req.infoUser && (req.infoUser.id || req.infoUser._id)) {
        newArray.fundacion = req.infoUser.id || req.infoUser._id;
        } else if (fundacion) {

        newArray.fundacion = fundacion;
        } else {

        return res.status(400).json({
            errors: {
            fundacion:
                "No se pudo determinar la fundación (ni desde el token ni desde el body).",
            },
        });
        }

        try {
        const newemergencia = await Emergencia.create(newArray);
        return res.status(201).json(newemergencia);
        } catch (e) {
        const messages = {};

        if (e.name === "ValidationError") {
            Object.keys(e.errors).forEach((key) => {
            messages[key] = e.errors[key].message;
            });
        }

        if (e.code === 11000) {
            messages["titulo"] = "El titulo ya existe en la DB";
        }

        return res.status(400).json({ errors: { ...messages } });
        }
    },


    getOne: async (req, res) => {
        const id = req.params.id;

        try {
        const oneEmergencia = await Emergencia.findById(id).populate(
            "fundacion",
            "nombre correo telefono"
        );


        if (!oneEmergencia) {
            return res
            .status(404)
            .json({ message: "El id de la emergencia no existe" });
        }

        return res.status(201).json(oneEmergencia);
        } catch (e) {
        return res.status(400).json(e);
        }
    },

    deleteOne: async (req, res) => {
        const id = req.params.id;

        try {
        const deleteEmergencia = await Emergencia.findByIdAndDelete(id);

        if (!deleteEmergencia) {
            return res.status(404).json({ message: "El id Emergencia no existe" });
        }

        return res
            .status(201)
            .json({ message: "La Emergencia fue correctamente eliminada" });
        } catch (e) {
        return res.status(400).json(e);
        }
    },


    updateOne: async (req, res) => {
        const id = req.params.id;
        const {
            titulo,
            fundacion,
            cantidad_personas,
            ciudad,
            descripcion,
            habilidades,
        } = req.body;

        const dataTobeUpdated = {};
        if (titulo !== undefined) dataTobeUpdated.titulo = titulo;
        if (fundacion !== undefined) dataTobeUpdated.fundacion = fundacion;
        if (cantidad_personas !== undefined)
            dataTobeUpdated.cantidad_personas = cantidad_personas;
        if (ciudad !== undefined) dataTobeUpdated.ciudad = ciudad;
        if (descripcion !== undefined) dataTobeUpdated.descripcion = descripcion;
        if (habilidades !== undefined) dataTobeUpdated.habilidades = habilidades;

        try {
            console.log("UPDATE BODY:", req.body);
            console.log("DATA TO UPDATE:", dataTobeUpdated);

            const oneUpdated = await Emergencia.findByIdAndUpdate(
            id,
            dataTobeUpdated,
            { new: true, runValidators: true }
            );

            if (!oneUpdated) {
            return res.status(404).json({ message: "El id no existe" });
            }

            return res.status(200).json(oneUpdated);
        } catch (e) {
            const messages = {};

            if (e.name === "ValidationError") {
            Object.keys(e.errors).forEach((key) => {
                messages[key] = e.errors[key].message;
            });
            }

            if (e.code === 11000) {
            messages["titulo"] = "El titulo esta presente en esta base de datos";
            }

            return res.status(400).json({ errors: { ...messages } });
        }
        },

        postularVoluntario: async (req, res) => {
            try {
            const emergenciaId = req.params.id;
            const infoUser = req.infoUser;

            if (!infoUser) {
                return res.status(401).json({ message: "No autenticado" });
            }

            if (infoUser.tipo !== "voluntario") {
                return res
                .status(403)
                .json({ message: "Solo los voluntarios pueden postularse" });
            }

            const voluntarioId = infoUser.id || infoUser._id;

            const emergenciaActualizada = await Emergencia.findByIdAndUpdate(
                emergenciaId,
                { $addToSet: { voluntarios: voluntarioId } },
                { new: true }
            )
                .populate("fundacion", "nombre correo telefono")
                .populate("voluntarios", "nombre_Completo email telefono");

            if (!emergenciaActualizada) {
                return res
                .status(404)
                .json({ message: "La emergencia no existe" });
            }

            return res.status(200).json({
                message: "Te postulaste correctamente a la emergencia",
                emergencia: emergenciaActualizada,
            });
            } catch (e) {
            console.error("Error en postularVoluntario:", e);
            return res
                .status(500)
                .json({ message: "Error en el servidor" });
        }
    },
    getPostuladosFundacion: async (req, res) => {
        try {
            const infoUser = req.infoUser;

            if (!infoUser) {
            return res.status(401).json({ message: "No autenticado" });
            }

            if (infoUser.tipo !== "fundacion") {
            return res
                .status(403)
                .json({ message: "Solo las fundaciones pueden ver postulados" });
            }
            const fundacionId = infoUser.id || infoUser._id;

            const emergencias = await Emergencia.find({ fundacion: fundacionId })
            .select("titulo ciudad cantidad_personas voluntarios createdAt")
            .populate(
                "voluntarios",
                "nombre_Completo email telefono ciudad disponibilidad habilidades"
            );

            return res.status(200).json(emergencias);
        } catch (e) {
            console.error("Error en getPostuladosFundacion:", e);
            return res
            .status(500)
            .json({ message: "Error en el servidor al obtener postulados" });
        }
        },
};


    export default emergenciaController;