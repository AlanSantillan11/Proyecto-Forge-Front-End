import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BotonPrimario from "../../componentes/Botones/BotonPrimario.jsx";
import { MdSave, MdDelete } from "react-icons/md";

const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload;
    } catch (e) {
        console.error("Error al decodificar el token", e);
        return null;
    }
};

const EditarEmergencia = ({ logOut, setLogin }) => {
    const { id } = useParams();
    const navegar = useNavigate();

    const [formData, setFormData] = useState({
        titulo: "",
        cantidad_personas: "",
        ciudad: "",
        descripcion: "",
        habilidades: "",
    });

    const [cargando, setCargando] = useState(true);
    const [errores, setErrores] = useState({});
    const [errorGeneral, setErrorGeneral] = useState("");
    const [sinPermiso, setSinPermiso] = useState(false);

    const usuario = getUserFromToken();
    const usuarioId = usuario ? String(usuario.id || usuario._id || "") : "";
    const esFundacion = usuario?.tipo === "fundacion";


    const traerEmergencia = async () => {
        try {
        const URL = `http://localhost:8080/api/emergencias/${id}`;
        const res = await axios.get(URL, {
            headers: { token_user: localStorage.getItem("token") },
        });

        const emergencia = res.data;

        const fundacionId = emergencia?.fundacion
            ? String(
                typeof emergencia.fundacion === "object"
                ? emergencia.fundacion._id
                : emergencia.fundacion
            )
            : "";

        if (!(esFundacion && fundacionId && fundacionId === usuarioId)) {
            setSinPermiso(true);
            setCargando(false);
            return;
        }

        setFormData({
            titulo: emergencia.titulo || "",
            cantidad_personas: emergencia.cantidad_personas || "",
            ciudad: emergencia.ciudad || "",
            descripcion: emergencia.descripcion || "",
            habilidades: emergencia.habilidades || "",
        });

        setLogin?.(true);
        setCargando(false);
        } catch (e) {
        console.error("Error al traer emergencia:", e);
        setCargando(false);

        if (e.response?.status === 406) {
            logOut?.();
        } else if (e.response?.status === 404) {
            setErrorGeneral("La emergencia no existe.");
        } else {
            setErrorGeneral("Ocurrió un error al cargar la emergencia.");
        }
        }
    };

    useEffect(() => {
        traerEmergencia();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]: name === "cantidad_personas" ? value.replace(/\D/g, "") : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrores({});
        setErrorGeneral("");

        try {
        const URL = `http://localhost:8080/api/emergencias/${id}`;
        const dataToSend = {
            ...formData,
            cantidad_personas: Number(formData.cantidad_personas),
        };

        const res = await axios.put(URL, dataToSend, {
            headers: { token_user: localStorage.getItem("token") },
        });


        navegar(`/emergencias/${res.data._id || id}`);
        } catch (e) {
        console.error("Error al actualizar emergencia:", e);

        if (e.response?.status === 406) {
            logOut?.();
            return;
        }

        if (e.response?.data?.errors) {
            setErrores(e.response.data.errors);
        } else {
            setErrorGeneral("Ocurrió un error al actualizar la emergencia.");
        }
        }
    };

    const handleEliminar = async () => {
        const confirmar = window.confirm(
        "¿Estás seguro de que querés eliminar esta emergencia? Esta acción no se puede deshacer."
        );
        if (!confirmar) return;

        try {
        const URL = `http://localhost:8080/api/emergencias/${id}`;
        await axios.delete(URL, {
            headers: { token_user: localStorage.getItem("token") },
        });

        navegar("/emergencias");
        } catch (e) {
        console.error("Error al eliminar emergencia:", e);

        if (e.response?.status === 406) {
            logOut?.();
            return;
        }

        setErrorGeneral("Ocurrió un error al eliminar la emergencia.");
        }
    };

    if (!usuario) {
        return (
        <div className="container mt-4">
            <p>Debes iniciar sesión para editar emergencias.</p>
        </div>
        );
    }

    if (cargando) {
        return (
        <div className="container mt-4">
            <p>Cargando emergencia...</p>
        </div>
        );
    }

    if (sinPermiso) {
        return (
        <div className="container mt-4">
            <p>No tenés permiso para editar esta emergencia.</p>
        </div>
        );
    }

    return (
        <div className="container mt-4">
        <h2 className="mb-3">Editar emergencia</h2>

        {errorGeneral && (
            <div className="alert alert-danger" role="alert">
            {errorGeneral}
            </div>
        )}

        <form onSubmit={handleSubmit} className="card p-4">
            <div className="mb-3">
            <label className="form-label">Título</label>
            <input
                type="text"
                name="titulo"
                className={`form-control ${errores.titulo ? "is-invalid" : ""}`}
                value={formData.titulo}
                onChange={handleChange}
            />
            {errores.titulo && (
                <div className="invalid-feedback">{errores.titulo}</div>
            )}
            </div>

            <div className="mb-3">
            <label className="form-label">Cantidad de personas</label>
            <input
                type="text"
                name="cantidad_personas"
                className={`form-control ${
                errores.cantidad_personas ? "is-invalid" : ""
                }`}
                value={formData.cantidad_personas}
                onChange={handleChange}
            />
            {errores.cantidad_personas && (
                <div className="invalid-feedback">
                {errores.cantidad_personas}
                </div>
            )}
            </div>

            <div className="mb-3">
            <label className="form-label">Ciudad</label>
            <input
                type="text"
                name="ciudad"
                className={`form-control ${errores.ciudad ? "is-invalid" : ""}`}
                value={formData.ciudad}
                onChange={handleChange}
            />
            {errores.ciudad && (
                <div className="invalid-feedback">{errores.ciudad}</div>
            )}
            </div>

            <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
                name="descripcion"
                className={`form-control ${
                errores.descripcion ? "is-invalid" : ""
                }`}
                rows="4"
                value={formData.descripcion}
                onChange={handleChange}
            />
            {errores.descripcion && (
                <div className="invalid-feedback">{errores.descripcion}</div>
            )}
            </div>

            <div className="mb-3">
            <label className="form-label">
                Habilidades requeridas (separadas por coma)
            </label>
            <input
                type="text"
                name="habilidades"
                className={`form-control ${
                errores.habilidades ? "is-invalid" : ""
                }`}
                value={formData.habilidades}
                onChange={handleChange}
            />
            {errores.habilidades && (
                <div className="invalid-feedback">{errores.habilidades}</div>
            )}
            </div>

            <div className="d-flex gap-3 mt-3">
                <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center gap-2">
                    <MdSave size={18} />
                    Guardar cambios
                </button>

                <button
                    type="button"
                    className="btn btn-outline-danger d-flex align-items-center gap-2"
                    onClick={handleEliminar}>
                    <MdDelete size={18} />
                    Eliminar emergencia
                </button>
            </div>

        </form>
        </div>
    );
};

export default EditarEmergencia;
