import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imgInundacion from "../../img/imgInundacion.png";
import { MdOutlineLocationOn, MdPersonAddAlt, MdAccessTime } from "react-icons/md";
import { tiempoPublicacion } from "../../utils/tiempoPublicacionEmergencia.js";
import maps from "../../img/mapGoogle.png";
import TarjetaEmergencia from "../../componentes/Tarjetas/TarjetaEmergencia.jsx";
import Styles from "../../componentes/Tarjetas/TarjetaEmergencia.module.css";
import StylesBoton from "../../componentes/Botones/BotonPrimario.module.css";

const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        console.log("USUARIO DESDE TOKEN (detalle):", decodedPayload);
        return decodedPayload;
    } catch (e) {
        console.error("Error al decodificar el token", e);
        return null;
    }
    };

    const VerEmergencia = ({ listaEmergencias, logOut, setLogin }) => {
    const [emergencia, setEmergencia] = useState({});
    const [error, setErrors] = useState("");
    const [mensajePostulacion, setMensajePostulacion] = useState("");
    const [esExitoPostulacion, setEsExitoPostulacion] = useState(false);   // 👈 nuevo
    const [mostrarAviso, setMostrarAviso] = useState(false);              // 👈 nuevo

    const navegar = useNavigate();
    const { id } = useParams();

    const usuario = getUserFromToken();
    const usuarioId = usuario ? String(usuario.id || usuario._id || "") : "";
    const esVoluntario = usuario?.tipo === "voluntario";
    const esFundacion = usuario?.tipo === "fundacion";

    const fundacionId = emergencia?.fundacion
        ? String(
            typeof emergencia.fundacion === "object"
            ? emergencia.fundacion._id
            : emergencia.fundacion
        )
        : "";

    const esFundacionDueña =
        esFundacion && fundacionId && fundacionId === usuarioId;

    const getData = () => {
        const URL = `http://localhost:8080/api/emergencias/${id}`;
        axios(URL, { headers: { token_user: localStorage.getItem("token") } })
        .then((response) => {
            setEmergencia(response.data);
            setLogin(true);
            console.log("DATA:", response.data);
        })
        .catch((e) => {
            setErrors(e);
            if (e.response?.status === 406) {
            logOut();
            }
        });
    };

    useEffect(() => {
        getData();
    }, [id]);

    const handlePostularme = async () => {
        setMensajePostulacion("");
        setEsExitoPostulacion(false);
        setMostrarAviso(false);

        try {
        const URL = `http://localhost:8080/api/emergencias/${id}/postular`;

        const res = await axios.post(
            URL,
            {},
            {
            headers: { token_user: localStorage.getItem("token") },
            }
        );

        // Actualizamos la emergencia si viene desde el backend
        if (res.data.emergencia) {
            setEmergencia(res.data.emergencia);
        } else {
            getData();
        }

        const emergenciaActual =
            res.data.emergencia || emergencia || {};
        const nombreEmergencia =
            emergenciaActual.titulo || "la emergencia";
        const nombreFundacion =
            emergenciaActual?.fundacion?.nombre ||
            emergencia?.fundacion?.nombre ||
            "la fundación";

        // Mensaje al estilo del diseño
        const mensaje = `Te has registrado para ayudar en "${nombreEmergencia}". El equipo de ${nombreFundacion} se comunicará contigo a la brevedad.`;

        setMensajePostulacion(mensaje);
        setEsExitoPostulacion(true);
        setMostrarAviso(true); // 👈 abre el cartel verde
        } catch (e) {
        console.error("Error al postularse:", e);

        if (
            e.response?.status === 401 ||
            e.response?.status === 403 ||
            e.response?.status === 406
        ) {
            logOut?.();
            return;
        }

        setMensajePostulacion(
            e.response?.data?.message || "No se pudo completar la postulación"
        );
        setEsExitoPostulacion(false);
        // NO mostramos el modal en error, solo el texto debajo
        }
    };

    const cantidadVoluntarios =
        Array.isArray(emergencia.voluntarios) ? emergencia.voluntarios.length : 0;

    return (
        <>
        <div className="m-4 d-flex flex-column  gap-4">
            <div className="card p-4 d-flex gap-4">
            <div className="row g-4 align-items-stretch">
                <div className="col-md-6">
                <img
                    src={imgInundacion}
                    className="img-fluid w-100 h-100 object-fit-cover rounded"
                    alt="Imagen de la Emergencia"
                />
                </div>

                <div className="col-md-6 d-flex">
                <div className="d-flex flex-column justify-content-between w-100">
                    <div className="card-body d-flex flex-column p-0 ">
                    <div className="d-flex justify-content-between ">
                        <div className={Styles.ubicacion}>
                        <p className={Styles.ubicacionTexto}>
                            Organizado por: {emergencia?.fundacion?.nombre}
                        </p>
                        </div>

                        <div className={Styles.ubicacion}>
                        <MdAccessTime size={16} color="#424655" />
                        <p className={Styles.ubicacionTexto}>
                            {tiempoPublicacion(emergencia?.updatedAt)}
                        </p>
                        </div>
                    </div>

                    <h3 className="card-title">{emergencia.titulo}</h3>

                    <p className={`card-text ${Styles.descripcion}`}>
                        {emergencia.descripcion}
                    </p>

                    <div className="d-flex gap-2 flex-wrap">
                        {emergencia.habilidades
                        ?.split(",")
                        .map((hab, index) => (
                            <span
                            key={index}
                            className={`badge ${Styles.habilidades}`}
                            >
                            {hab.trim()}
                            </span>
                        ))}
                    </div>
                    </div>

                    <div>
                    <p className="card-text">
                        {cantidadVoluntarios}/{emergencia.cantidad_personas}
                    </p>

                    {esVoluntario && (
                        <button
                        type="button"
                        className={`btn ${StylesBoton.btnPrimario} d-flex align-items-center justify-content-center w-100 gap-2`}
                        onClick={handlePostularme}
                        >
                        <MdPersonAddAlt size={18} />
                        Registrarme como Voluntario
                        </button>
                    )}

                    {esFundacionDueña && (
                        <button
                        type="button"
                        className="btn btn-outline-primary mt-2"
                        onClick={() =>
                            navegar(`/emergencias/editar/${emergencia._id}`)
                        }
                        >
                        Editar emergencia
                        </button>
                    )}

                    {/* Mensaje solo para error (cuando no hay modal de éxito) */}
                    {mensajePostulacion && !esExitoPostulacion && (
                        <p className="mt-2" style={{ color: "red" }}>
                        {mensajePostulacion}
                        </p>
                    )}
                    </div>
                </div>
                </div>
            </div>

            <div>
                <div className={Styles.ubicacion}>
                <MdOutlineLocationOn size={24} color="#191B24" />
                <p className={Styles.ubicacionTextoGrande}>
                    {emergencia.ciudad}
                </p>
                </div>

                <div>
                <img
                    src={maps}
                    className="img-fluid w-100 h-100 object-fit-cover rounded"
                    alt="Imagen de la Emergencia"
                />
                </div>
            </div>
            </div>

            <div>
            <h3 className="p-3">Más Emergencias Activas</h3>

            <div className=" d-flex gap-4">
                <TarjetaEmergencia listaEmergencias={listaEmergencias} />
            </div>
            </div>
        </div>

        {/* --------- MODAL DE REGISTRO EXITOSO --------- */}
        {mostrarAviso && esExitoPostulacion && (
            <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1050 }}
            >
            <div
                className="rounded-4 shadow p-4"
                style={{
                maxWidth: "420px",
                width: "90%",
                backgroundColor: "#E7F9EE",
                textAlign: "center",
                }}
            >
                <div className="mb-3">
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                    style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#22C55E",
                    color: "white",
                    fontSize: "24px",
                    }}
                >
                    ✓
                </div>
                </div>

                <h4 className="mb-2" style={{ color: "#15803D" }}>
                ¡Registro exitoso!
                </h4>

                <p
                className="mb-3"
                style={{ color: "#166534", fontSize: "0.9rem" }}
                >
                {mensajePostulacion}
                </p>

                <button
                type="button"
                className="btn fw-semibold"
                style={{ color: "#15803D", background: "transparent" }}
                onClick={() => setMostrarAviso(false)}
                >
                Aceptar
                </button>
            </div>
            </div>
        )}
        </>
    );
};

export default VerEmergencia;
