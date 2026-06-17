import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import registro from "../../img/registro.png"
import Styles from "./RegistroVoluntarios.module.css"


const RegistroVoluntarios=({setLogin, setMeUser})=>{
    const [data, setData]= useState({nombre_Completo: "", email: "", telefono: "", ciudad: "", disponibilidad:"", habilidades: [], password: "", confirmarPassword: "" })
    const habilidades = [ "Atención Social", "Construcción", "Cocina", "Comunicaciones", "Organización", "Carpintería", "Transporte", "Traducción", "Manejo de crisis", "Logística", "Primeros Auxilios"];
    const [errors, setErrors]= useState({})
    const [paso, setPaso] = useState(1);



    
    const navegar = useNavigate();
    
    const actualizarEstado= (e)=>{
        setData({...data,[e.target.name] : e.target.value})
    }

    const manejarCheckbox = (e) => {
    const value = e.target.value;
    let nuevasHabilidades = [...data.habilidades];

    if (e.target.checked) {
        nuevasHabilidades.push(value);
    } else {
        nuevasHabilidades = nuevasHabilidades.filter(habilidad => habilidad !== value);
    }

    setData({ ...data, habilidades: nuevasHabilidades });
};

    const registrarVoluntario = (e) => {
    e.preventDefault();
    const payload = {
        nombre_Completo: data.nombre_Completo,
        email: data.email,
        telefono: data.telefono,
        ciudad: data.ciudad,
        disponibilidad: data.disponibilidad,
        habilidades: data.habilidades,
        password: data.password,
        passwordConfirmation: data.confirmarPassword
    };

    const URL = "http://localhost:8080/api/users/new";
    
    axios.post(URL, payload)
      .then(response => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          const decoded = jwt_decode(token);

          setLogin(true);
          setMeUser({
              _id: decoded.id,
              nombre: decoded.nombre_Completo,
              correo: decoded.email
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
                    <img className={Styles.img} src={registro} alt="organizacion" />
                </div>
            
                <div className="w-50 p-4 d-flex flex-column ">
                    
                    <h2>Regístrate como Voluntario</h2>
                    <div className="d-flex gap-2 mb-3">
                        <p>¿Ya tienes una cuenta? </p><Link to="/users/login">Iniciar Sesión </Link>
                    </div>
            
                    <form onSubmit={registrarVoluntario} className={Styles.formulario}>

                    {paso === 1 && (
                        <>
                        <div>

                           <div className="mb-3">
                                <label htmlFor="nombre_Completo" className="form-label">Nombre Completo:</label>
                                <input type="text" className="form-control" name="nombre_Completo" value={data.nombre_Completo} id="nombre_Completo" onChange={actualizarEstado} />
                                {errors?.nombre_Completo && <p style={{ color: "red" }}>{errors.nombre_Completo}</p>}
                            </div>

                            <div className="d-flex gap-4">
                                
                                <div className="mb-3 w-50">
                                    <label htmlFor="telefono" className="form-label">Telefono:</label>
                                    <input type="text" className="form-control" name="telefono" value={data.telefono} id="telefono" onChange={actualizarEstado} />
                                    {errors?.telefono && <p style={{ color: "red" }}>{errors.telefono}</p>}
                                </div>

                                <div className="mb-3 w-50">
                                    <label htmlFor="ciudad" className="form-label">Ciudad:</label>
                                    <input type="text" className="form-control" name="ciudad" value={data.ciudad}  id="ciudad" onChange={actualizarEstado} />
                                    {errors?.ciudad && <p style={{ color: "red" }}>{errors.ciudad}</p>}
                                </div>
                                
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo:</label>
                                <input type="text" className="form-control" name="email" value={data.email} id="email" onChange={actualizarEstado} />
                                {errors?.email && <p style={{ color: "red" }}>{errors.email}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña:</label>
                                <input type="password" className="form-control" name="password" value={data.password} id="password" onChange={actualizarEstado} />
                                {errors?.password && <p style={{ color: "red" }}>{errors.password}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirmarPassword" className="form-label">Confirmar Contraseña:</label>
                                <input type="password" className="form-control" name="confirmarPassword" value={data.confirmarPassword} id="confirmarPassword" onChange={actualizarEstado} />
                                {errors?.confirmarPassword && <p style={{ color: "red" }}>{errors.confirmarPassword}</p>}
                            </div>

                        </div>
                       
                        <div className="d-flex justify-content-end">
                            <button className={`btn btn-success ${Styles.btnSiguiente}`} type="button" onClick={() => setPaso(2)}>Siguiente</button>
                        </div>
                        </>
                    )}

                    {paso === 2 && (
                        <>
                        <div className="">
                            <div className="mb-3">
                                <select htmlFor="disponibilidad" className="form-select " name="disponibilidad" value={data.disponibilidad} id="disponibilidad" onChange={actualizarEstado} aria-label="Default select example">
                                    <option value="">Disponibilidad</option>
                                    <option value="Tiempo Completo">Tiempo Completo</option>
                                    <option value="Fines de Semana">Fines de Semana</option>
                                    <option value="Tardes/Noches">Tardes/Noches</option> 
                                    <option value="Solo Emergencias Crítcas">Solo Emergencias Crítcas</option>
                                    <option value="Flexible">Flexible</option>
                                </select>
                            </div>

                            <div className="d-flex flex-wrap gap-3">
                                {habilidades.map((habilidad, index) => (
                                    <div className="w-25 ">
                                        <label htmlFor="habilidades" className="d-flex gap-2" key={index}>
                                        <input className={Styles.checkbox} type="checkbox" value={habilidad} id="habilidades" checked={data.habilidades.includes(habilidad)} onChange={manejarCheckbox} />
                                        {habilidad}
                                        </label>
                                    </div>
                                ))}
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


export default RegistroVoluntarios