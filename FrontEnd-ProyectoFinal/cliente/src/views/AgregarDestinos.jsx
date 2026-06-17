import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"


const AgregarDestinos=({listaDeDestinos, setListaDeDestinos, logOut, login, me})=>{
    const [data, setData]= useState({lugar:"", descripcion:"", tips: "", epoca: "", costo: "", autor: {}})
    const [errors, setErrors]= useState({})
    const {id} = useParams();
    const navegar = useNavigate();

    const actualizarEstado= (e)=>{
        setData({...data,[e.target.name] : e.target.value})
    }

    const agregarDestinos= (e)=>{
        e.preventDefault();
        const URL = `http://localhost:8080/api/destinos/nuevo`
        axios.post(URL, data, {headers : {token_usuario : localStorage.getItem("token")}}).then(
            response=> {
                setListaDeDestinos([...listaDeDestinos, response.data])
                navegar("/destinos")
            }
    
        ).catch ( e=>{
            console.log("error en el back", e.respone?.data)
            setErrors(e.response?.data?.errors)
            if(!login){
                logOut()}
        },[login]
    )}


    const validarFormulario = () => {
        return Object.values(data).every(value => value === '');
    };




    return (
        <>
        <h2  className="text-center">Agrega un nuevo Destino!</h2>
        <div className="d-flex justify-content-center" >
            
            <form className="row w-50" onSubmit={(e)=>agregarDestinos(e)}>
                <div className="mb-3 ">

                    <label  htmlFor="lugar">Lugar:</label>
                    <input type="text"name="lugar" id="lugar" value={data.lugar} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    {errors?.lugar && <p style={{color : "red"}}>{errors.lugar}</p>}
                
                </div>

               
                <div className="mb-3 ">

                    <label htmlFor="descripcion">Descripción:</label>
                    <input type="text"name="descripcion" id="descripcion" value={data.descripcion} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    {errors?.descripcion && <p style={{color : "red"}}>{errors.descripcion}</p>}

                </div>

                <div className="mb-3 ">

                    <label htmlFor="tips">Tips viajeros:</label>
                    <input type="text"name="tips" id="tips" value={data.tips} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    {errors?.tips && <p style={{color : "red"}}>{errors.tips}</p>}

                </div>
                
                <div className="mb-3 ">

                    <label htmlFor="tips">Mejor época para visitar:</label>
                    <select name="epoca" value={data.epoca} onChange={actualizarEstado} className="form-select form-select-lg mb-3" aria-label="Large select example">
                        <option value="">Seleccioná una época</option>
                        <option value="Todo el año">Todo el año</option>
                        <option value="Verano">Verano</option>
                        <option value="Primavera">Primavera</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno">Invierno</option>
                    </select>
                    {errors?.epoca && <p style={{color : "red"}}>{errors.epoca}</p>}
                </div>

                <div className="mb-3 ">

                    <label htmlFor="costo">Costo Promedio:</label>
                    <input type="number"name="costo" id="costo" value={data.costo} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    {errors?.costo && <p style={{color : "red"}}>{errors.costo}</p>}

                </div>

                <button className="btn btn-success">Agregar Destino</button>
            </form>
        </div>
        </>
    )
}

export default AgregarDestinos