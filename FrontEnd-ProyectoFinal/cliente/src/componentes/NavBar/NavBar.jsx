import { MdOutlineEmergencyShare, MdOutlineVolunteerActivism, MdAdd , MdDomain } from "react-icons/md";
import logoNav from "../../img/logoNavBar.png";
import BotonNavBar from "./BotonNavBar.jsx";
import Styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

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

const NavBar = ({ login, logOut }) => {
  const usuario = getUserFromToken();

  const meFundacion = usuario?.tipo === "fundacion";
  const meUser = usuario?.tipo === "voluntario";

  return (
    <div
      className={`navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between px-5 sticky-top mb-3 ${Styles.navBar}`}
    >
      {/* LOGO */}
      <div>
        <Link to="/home">
          <img src={logoNav} alt="Logo" className={Styles.img} />
        </Link>
      </div>

      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary p-0 ${Styles.navBar}`}
      >
        <div className="container-fluid">
          <ul className="navbar-nav d-flex gap-4">
            <BotonNavBar
              to="/emergencias"
              texto="Emergencias Activas"
              Icono={MdOutlineEmergencyShare}
              end
            />

            {!login && (
              <>
                <BotonNavBar
                  to="/users/new"
                  texto="Soy Voluntario"
                  Icono={MdOutlineVolunteerActivism}
                />
                <BotonNavBar
                  to="/fundaciones/new"
                  texto="Soy Organización"
                  Icono={MdDomain}
                />
              </>
            )}

            {login && meFundacion && (
              <>
                <BotonNavBar
                  to="/emergencias/new"
                  texto="Agregar Emergencia"
                  Icono={MdAdd}
                />
                <BotonNavBar
                  to="/emergencias/postulados"
                  texto="Postulados"
                  Icono={MdOutlineVolunteerActivism}
                />
                <button className={Styles.logOut} onClick={logOut}>
                  Cerrar Sesión
                </button>
              </>
            )}

            {login && meUser && (
              <>
                <button
                  className={`btn ${Styles.botonNavBar}`}
                  onClick={logOut}
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
