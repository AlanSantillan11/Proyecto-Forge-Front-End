import { Emergencia } from "../models/emergencia.model.js";

const soloFundacionDueña = async (req, res, next) => {
    try {
        const infoUser = req.infoUser;

        if (!infoUser) {
            return res.status(401).json({ message: "No autenticado" });
        }

        const { id: userId, tipo } = infoUser;

        if (tipo !== "fundacion") {
            return res
                .status(403)
                .json({ message: "Solo fundaciones pueden modificar emergencias" });
        }

        const emergencia = await Emergencia.findById(req.params.id);

        if (!emergencia) {
            return res.status(404).json({ message: "La emergencia no existe" });
        }

        if (String(emergencia.fundacion) !== String(userId)) {
            return res
                .status(403)
                .json({ message: "No sos la fundación dueña de esta emergencia" });
        }

        next();
        } catch (e) {
            console.error("Error en soloFundacionDueña:", e);
            return res.status(500).json({ message: "Error en el servidor" });
        }
};

export default soloFundacionDueña;
