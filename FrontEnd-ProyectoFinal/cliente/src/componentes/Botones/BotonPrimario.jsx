import { Link } from "react-router-dom";
import Styles from "./BotonPrimario.module.css"


const BotonPrimario = ({ to, texto, Icono }) => {
  

  return (
    <Link to={to} className={`btn ${Styles.btnPrimario}`}>
        {Icono && <Icono size={20} />} {texto}
      
    </Link>
    
    
  );
};
export default BotonPrimario;