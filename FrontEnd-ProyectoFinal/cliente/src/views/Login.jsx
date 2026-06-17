import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login=({login, setLogin})=>{
    const [estado, setEstado]= useState({ email:"", contraseña:""})
        const [errors, setErrors]= useState({})
    
        const navegar = useNavigate();
    
        const actualizarEstado= (e)=>{
            setEstado({...estado,[e.target.name] : e.target.value})
        }

    const iniciarSesion= (e)=>{
        e.preventDefault();
        const URL = "http://localhost:8080/api/usuario/login"
        axios.post(URL, estado).then(
            response=> {
                localStorage.setItem("token", response.data.token)
                setLogin(true)
                setErrors({})
                console.log("NAVEGANDO A:", "/destinos")
                navegar("/destinos")
            }

        ).catch(e=>setErrors(e.response?.data?.errors))
    }    
    return(
        <>
        <h2  className="text-center">Inicia Sesión!</h2>
        <div className="d-flex justify-content-center" >
            
            <form className="row w-50" onSubmit={(e)=>iniciarSesion(e)}>
                <div className="mb-3 ">

                    <label  htmlFor="email">email:</label>
                    <input type="email"name="email" id="email" value={estado.email} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    {errors?.email && <p style={{color : "red"}}>{errors.email}</p>}
                
                </div>

               
                <div className="mb-3 ">

                    <label htmlFor="contraseña">contraseña:</label>
                    <input type="password"name="contraseña" id="contraseña" value={estado.contraseña} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    {errors?.contraseña && <p style={{color : "red"}}>{errors.contraseña}</p>}

                </div>

                <button className="btn btn-success">Iniciar Sesión</button>
            </form>
        </div>


        </>
    )
}


export default Login