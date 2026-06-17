import { Link } from "react-router-dom";
import Styles from "./BotonSecundario.module.css"

const BotonSecundario = ({ to, texto, Icono }) => {
    console.log("ICONO RECIBIDO:", Icono);

  return (

    <Link className={`btn ${Styles.btnSecundario}`} to={to}>
      {Icono && <Icono size={24} />} {texto}
    </Link>
    
    
    
  );
};
export default BotonSecundario;