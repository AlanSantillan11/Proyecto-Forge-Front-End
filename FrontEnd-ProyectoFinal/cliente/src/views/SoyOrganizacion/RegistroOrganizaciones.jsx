import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import registroImg from "../../img/registroorganizaciones.png"
import Styles from "./RegistroOrganizaciones.module.css"


const RegistroOrganizaciones=({setLogin, setMeFundacion})=>{
    const [data, setData]= useState({nombre:"", cuit:"", contacto:"", correo:"", telefono:"", descripcion: "", password:"" })
    const [errors, setErrors]= useState({})
    const [paso, setPaso] = useState(1);


    
    const navegar = useNavigate();
    
    const actualizarEstado= (e)=>{
        setData({...data,[e.target.name] : e.target.value})
    }

    const registrarOrganización = (e) => {
    e.preventDefault();
    const payload = {
        nombre: data.nombre,
        cuit: data.cuit,
        contacto: data.contacto,
        correo: data.correo,
        telefono: data.telefono,
        descripcion: data.descripcion,
        contraseña: data.password,            
        passwordConfirmation: data.password,  
  };

    const URL = "http://localhost:8080/api/fundaciones/new";
    
    axios.post(URL, payload)
      .then(response => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          const decoded = jwt_decode(token);

          setLogin(true);
          setMeFundacion({
              _id: decoded.id,
              nombre: decoded.nombre,
              correo: decoded.correo
          });

          setErrors({});
          navegar("/home");
      })
      .catch(e => {console.log(e.response?.data);
        setErrors(e.response?.data?.errors || {})});
    };


    return(
        <>
            <div className={`container-fluid p-0 ${Styles.registro}`}>
                <div className="w-50">
                    <img className={Styles.img} src={registroImg} alt="organizacion" />
                </div>
            
                <div className="w-50 p-4 d-flex flex-column ">
                    
                    <h2>Regístrate como Organización</h2>
                    <div className="d-flex gap-2 mb-3">
                        <p>¿Ya tienes una cuenta? </p><Link to="/fundaciones/login">Iniciar Sesión </Link>
                    </div>
            
                    <form onSubmit={registrarOrganización} className={Styles.formulario}>

                    {paso === 1 && (
                        <>
                        <div>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre de la Organización:</label>
                                <input type="text" className="form-control" name="nombre" id="nombre" value={data.nombre} onChange={actualizarEstado} />
                                {errors?.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cuit" className="form-label">Cuit:</label>
                                <input type="text" className="form-control" name="cuit" value={data.cuit} id="cuit" onChange={actualizarEstado} />
                                {errors?.cuit && <p style={{ color: "red" }}>{errors.cuit}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label">Descripción:</label>
                                <textarea type="text" className="form-control" name="descripcion" value={data.descripcion} id="descripcion" onChange={actualizarEstado} />
                                {errors?.descripcion && <p style={{ color: "red" }}>{errors.descripcion}</p>}
                            </div>

                        </div>
                       
                        <div className="d-flex justify-content-end">
                            <button className={`btn btn-success ${Styles.btnSiguiente}`} type="button" onClick={() => setPaso(2)}>Siguiente</button>
                        </div>
                        </>
                    )}

                    {paso === 2 && (
                        <>
                        <div>
                            <div className="d-flex gap-4">
                                <div className="mb-3 w-50">
                                    <label htmlFor="contacto" className="form-label">Nombre del Contacto:</label>
                                    <input type="text" className="form-control" name="contacto" value={data.contacto} id="contacto" onChange={actualizarEstado} />
                                    {errors?.contacto && <p style={{ color: "red" }}>{errors.contacto}</p>}
                                </div>

                                <div className="mb-3 w-50">
                                    <label htmlFor="telefono" className="form-label">Telefono:</label>
                                    <input type="text" className="form-control" name="telefono" value={data.telefono} id="telefono" onChange={actualizarEstado} />
                                    {errors?.telefono && <p style={{ color: "red" }}>{errors.telefono}</p>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo:</label>
                                <input type="text" className="form-control" name="correo" value={data.correo} id="correo"  onChange={actualizarEstado} />
                                {errors?.correo && <p style={{ color: "red" }}>{errors.correo}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña:</label>
                                <input type="password" className="form-control" name="password" value={data.password} id="password" onChange={actualizarEstado} />
                                {errors?.password && <p style={{ color: "red" }}>{errors.password}</p>}
                            </div>
                        </div>
                    
                        <div className="d-flex justify-content-between">
                            <button className={`btn btn-success ${Styles.btnAtras}`} type="button" onClick={() => setPaso(1)}>
                            Volver
                            </button>

                            <button className={`btn btn-success ${Styles.btnSiguiente}`} type="submit" >Registrarme</button>
                        </div>
                        </>
                    )}

                    </form>

                </div>
            </div>
        
        </>
    )
}


export default RegistroOrganizaciones