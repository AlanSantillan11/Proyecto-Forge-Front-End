import { NavLink } from "react-router-dom";
import Styles from "./NavBar.module.css";

const BotonNavBar = ({ to, texto, Icono, end }) => {

  return (
    <NavLink to={to} end={end} className={({ isActive }) => isActive ? `${Styles.botonNavBar} ${Styles.botonNavBarActivo}`: Styles.botonNavBar}>
      {Icono && <Icono size={24} />} {texto}
    </NavLink>
    
  );
};
export default BotonNavBar;
