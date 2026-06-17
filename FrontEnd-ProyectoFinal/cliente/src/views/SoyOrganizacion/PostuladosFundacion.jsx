import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    const PostuladosFundacion = ({ logOut, setLogin }) => {
    const [emergencias, setEmergencias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const navegar = useNavigate();

    const usuario = getUserFromToken();
    const esFundacion = usuario?.tipo === "fundacion";

    const traerPostulados = async () => {
        try {
        const URL = "http://localhost:8080/api/emergencias/mis-postulados";
        const res = await axios.get(URL, {
            headers: { token_user: localStorage.getItem("token") },
        });

        setEmergencias(res.data || []);
        setLogin?.(true);
        setCargando(false);
        } catch (e) {
        console.error("Error al traer postulados:", e);
        setCargando(false);

        if (e.response?.status === 406) {
            logOut?.();
            return;
        }

        setError(
            e.response?.data?.message ||
            "Ocurrió un error al cargar las postulaciones."
        );
        }
    };

    useEffect(() => {
        traerPostulados();
    }, []);

    if (!usuario || !esFundacion) {
        return (
        <div className="container mt-4">
            <p>Solo las fundaciones pueden ver los postulados.</p>
        </div>
        );
    }

    if (cargando) {
        return (
        <div className="container mt-4">
            <p>Cargando postulados...</p>
        </div>
        );
    }

    return (
        <div className="container mt-4">
        <h2 className="mb-3">Voluntarios postulados a mis emergencias</h2>

        {error && (
            <div className="alert alert-danger" role="alert">
            {error}
            </div>
        )}

        {emergencias.length === 0 && !error && (
            <p>No tenés emergencias con voluntarios postulados todavía.</p>
        )}

        {emergencias.map((emergencia) => (
            <div className="card mb-4" key={emergencia._id}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="card-title mb-0">{emergencia.titulo}</h4>
                </div>
                <p className="mb-1">
                <strong>Ciudad:</strong> {emergencia.ciudad}
                </p>
                <p className="mb-3">
                <strong>Cupos:</strong>{" "}
                {emergencia.voluntarios?.length || 0}/
                {emergencia.cantidad_personas}
                </p>

                {(!emergencia.voluntarios ||
                emergencia.voluntarios.length === 0) && (
                <p className="text-muted mb-0">
                    No hay voluntarios postulados para esta emergencia.
                </p>
                )}

                {emergencia.voluntarios && emergencia.voluntarios.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-sm align-middle">
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Ciudad</th>
                        <th>Disponibilidad</th>
                        <th>Habilidades</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emergencia.voluntarios.map((vol) => (
                        <tr key={vol._id}>
                            <td>{vol.nombre_Completo}</td>
                            <td>{vol.email}</td>
                            <td>{vol.telefono}</td>
                            <td>{vol.ciudad}</td>
                            <td>{vol.disponibilidad}</td>
                            <td>
                            {Array.isArray(vol.habilidades)
                                ? vol.habilidades.join(", ")
                                : vol.habilidades}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                )}
            </div>
            </div>
        ))}
        </div>
    );
};

export default PostuladosFundacion;
