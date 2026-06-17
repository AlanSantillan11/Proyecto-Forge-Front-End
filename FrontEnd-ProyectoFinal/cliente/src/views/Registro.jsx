import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Registro=({login, setLogin})=>{
    const [estado, setEstado]= useState({primerNombre:"", apellido:"", email:"", contraseña:"", confirmarContraseña:""})
        const [errors, setErrors]= useState({})
    
        const navegar = useNavigate();
    
        const actualizarEstado= (e)=>{
            setEstado({...estado,[e.target.name] : e.target.value})
        }

    const registrarUsuario= (e)=>{
        e.preventDefault();
        const URL = "http://localhost:8080/api/usuario/nuevo"
        axios.post(URL, estado).then(
            response=> {
                localStorage.setItem("token", response.data.token)
                setLogin(true)
                setErrors({})
                navegar("/destinos")
            }

        ).catch(e=>
            setErrors(e.response.data.errors))
    }    


    return(
        <>
        <h2  className="text-center">Registrate!</h2>
        <div className="d-flex justify-content-center" >
            
            <form className="row w-50" onSubmit={(e)=>registrarUsuario(e)}>

                <div className="mb-3 ">

                    <label  htmlFor="primerNombre">Nombre:</label>
                    <input type="text"name="primerNombre" id="primerNombre" value={estado.primerNombre} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    {errors?.primerNombre && <p style={{color : "red"}}>{errors.primerNombre}</p>}
                
                </div>

                <div className="mb-3 ">

                    <label  htmlFor="apellido">Apellido:</label>
                    <input type="text"name="apellido" id="apellido" value={estado.apellido} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    {errors?.apellido && <p style={{color : "red"}}>{errors.apellido}</p>}
                
                </div>

                <div className="mb-3 ">

                    <label  htmlFor="email">Email:</label>
                    <input type="email"name="email" id="email" value={estado.email} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    {errors?.email && <p style={{color : "red"}}>{errors.email}</p>}
                
                </div>

               <div className="mb-3 ">

                    <label htmlFor="contraseña">contraseña:</label>
                    <input type="password"name="contraseña" id="contraseña" value={estado.contraseña} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    {errors?.contraseña && <p style={{color : "red"}}>{errors.contraseña}</p>}

                </div>

                <div className="mb-3 ">

                    <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
                    <input type="password"name="confirmarContraseña" id="confirmarContraseña" value={estado.confirmarContraseña} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    {errors?.confirmarContraseña && <p style={{color : "red"}}>{errors.confirmarContraseña}</p>}

                </div>

                <button className="btn btn-success">Registrarse</button>
            </form>
        </div>


        </>
    )
}


export default Registro