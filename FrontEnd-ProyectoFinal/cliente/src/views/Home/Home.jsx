import logo from "../../img/logo.svg";
import fondoHome from "../../img/fondoHome.png";
import instrucciones from "../../img/instrucciones.png";
import BotonPrimario from "../../componentes/Botones/BotonPrimario.jsx"
import { MdPersonAddAlt, MdDomain  } from "react-icons/md"
import BotonSecundario from "../../componentes/Botones/BotonSecundario.jsx"
import Styles from "./Home.module.css"

const Home =()=>{
    return(
        <div className={Styles.homeBody}>
        <div className="d-flex flex-column gap-4 " >
            <div >
                <img src={fondoHome} className="card-img h-75" alt="..."/>
                <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center gap-4">
                    <img src={logo} className="w-50 h-0" alt="..."/>
                    <h2 style={{ color: "#ffffff" }}>Tecnología que salva, voluntarios que actúan.</h2>
                    <div className="d-flex flex-row justify-content-center w-50 gap-4">
                        <BotonPrimario texto="Registrarme como Voluntario"  Icono={MdPersonAddAlt} to="/users/new" />
                        <BotonSecundario texto="Registrarme como Organización"  Icono={MdDomain } to="/fundaciones/new" />
                    </div>
                    
                </div>
                
            </div>

            <div className="p-4">
                    <img src={instrucciones} className="card-img" alt="..."/>
            </div>
        </div>
        </div>
    )
}


export default Home