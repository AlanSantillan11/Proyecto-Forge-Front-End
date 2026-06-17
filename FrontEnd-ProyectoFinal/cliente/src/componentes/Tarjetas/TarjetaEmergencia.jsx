import { MdOutlineLocationOn, MdPersonAddAlt, MdAccessTime } from "react-icons/md";
import imgInundacion from "../../img/imgInundacion.png";
import Styles from "./TarjetaEmergencia.module.css";
import BotonPrimario from "./../Botones/BotonPrimario.jsx";
import { useNavigate } from "react-router-dom";
import { tiempoPublicacion } from "../../utils/tiempoPublicacionEmergencia.js";

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    console.log("USUARIO DESDE TOKEN:", decodedPayload);
    return decodedPayload;
  } catch (e) {
    console.error("Error al decodificar el token", e);
    return null;
  }
};

const TarjetaEmergencia = ({ listaEmergencias }) => {
  const navegar = useNavigate();

  const usuario = getUserFromToken();
  const usuarioId = usuario ? String(usuario.id || usuario._id || "") : "";
  const esVoluntario = usuario?.tipo === "voluntario";
  const esFundacion = usuario?.tipo === "fundacion";
  const mostrarBotonVoluntario = !usuario || esVoluntario;

  return (
    <div className="row g-3 g-md-4">
      {listaEmergencias?.map((emergencia, index) => {
        const fundacionId = emergencia?.fundacion
          ? String(
              typeof emergencia.fundacion === "object"
                ? emergencia.fundacion._id
                : emergencia.fundacion
            )
          : "";

        const esFundacionDueña =
          esFundacion && fundacionId && fundacionId === usuarioId;

        return (
          <div key={index} className="col-6 col-md-3">
            <div
              className={`card ${Styles.card}`}
              onClick={() => navegar(`/emergencias/${emergencia._id}`)}
            >
              <img
                src={imgInundacion}
                className={`${Styles.img}`}
                alt="Imagen de la Emergencia"
              />

              <div className={`card-body d-flex flex-column ${Styles.cardBody}`}>
                <div className={`d-flex justify-content-between mb-2 ${Styles.headerRow}`}>
                  <div className={Styles.ubicacion}>
                    <MdOutlineLocationOn size={16} />
                    <p className={Styles.ubicacionTexto}>
                      {emergencia.ciudad}
                    </p>
                  </div>

                  <div className={Styles.ubicacion}>
                    <MdAccessTime size={16} />
                    <p className={Styles.ubicacionTexto}>
                      {tiempoPublicacion(emergencia.updatedAt)}
                    </p>
                  </div>
                </div>

                <h3 className={Styles.titulo}>{emergencia.titulo}</h3>

                <p className={`card-text ${Styles.descripcion}`}>
                  {emergencia.descripcion}
                </p>

                <div className="d-flex gap-2 flex-wrap mb-2">
                  {emergencia.habilidades
                    ?.split(",")
                    .slice(0, 3)
                    .map((hab, idx) => (
                      <span
                        key={idx}
                        className={`badge ${Styles.habilidades}`}
                      >
                        {hab.trim()}
                      </span>
                    ))}

                  {emergencia.habilidades?.split(",").length > 3 && (
                    <span className={`badge ${Styles.habilidades}`}>
                      +{emergencia.habilidades.split(",").length - 3}
                    </span>
                  )}
                </div>

                <div className={`mt-auto ${Styles.footer}`}>
                  <p className="card-text mb-2">
                    0/{emergencia.cantidad_personas}
                  </p>

                  {mostrarBotonVoluntario && (
                    <BotonPrimario
                      texto="Registrarme como Voluntario"
                      Icono={MdPersonAddAlt}
                    />
                  )}

                  {esFundacionDueña && (
                    <BotonPrimario
                      texto="Editar emergencia"
                      to={`/emergencias/editar/${emergencia._id}`}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TarjetaEmergencia;
