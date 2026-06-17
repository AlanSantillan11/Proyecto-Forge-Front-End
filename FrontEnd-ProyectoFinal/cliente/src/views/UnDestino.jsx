import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Opiniones from "../componentes/Opiniones";

const UnDestino = ({listaDeDestinos, setListaDeDestinos, logOut, setLogin, me}) => {
    const navegar = useNavigate()
    const {id} = useParams();
    const [dataDestinos, setDataDestinos]= useState({lugar:"", descripcion:"", tips: "", epoca: "",costo:"", opinion:[], autor: {}})
    const [error,setErrors] = useState('')


    const getData = ()=> {
        const URL = `http://localhost:8080/api/destinos/${id}`
        axios(URL, {headers: {token_usuario : localStorage.getItem("token")}}).then(
            response => {
                console.log("BACKEND RESPUESTA:", response.data)

                setDataDestinos(response.data)
                setLogin(true)
            }
        ).catch(e => {
                setErrors(e)
                if(e.status == 406){
                    logOut()
                }
            }
        )
    }


    useEffect(()=>{
    getData()
    }, [id]);


    const eliminarDestinos = () => {
        const URL = `http://localhost:8080/api/destinos/${id}`
        axios.delete(URL, {headers: {token_usuario : localStorage.getItem("token")}}).then(
            response => {
                setListaDeDestinos(listaDeDestinos.filter( destino => destino._id !== id))
                setLogin(true)
                navegar('/destinos')
            }
        ).catch(
            e => {
                if(e.status == 406) {
                    logOut()
                }
            }
        )
    }

    return(
        <>
        <div className="d-flex"> 
                <div className="row d-flex p-4 w-50"> 
                    <h2>{dataDestinos.lugar}</h2>
                    <div className="card "> 
                        <div className="card-body">
                            <div> 
                                <h3 className="card-title">Destino creado por: {dataDestinos?.autor?.primerNombre}</h3> 
                                <div>
                                    <h4 className="card-subtitle">Descripción: </h4>
                                    <p>{dataDestinos.descripcion} </p>
                                </div>
                                <div>
                                    <h4 className="card-subtitle">Tips viajeros: </h4>
                                    <p>{dataDestinos.tips} </p>
                                </div>
                                <div>
                                    <h4 className="card-subtitle">Mejor época para viajar: </h4>
                                    <p>{dataDestinos.epoca} </p>
                                </div>
                                <div>
                                    <h4 className="card-subtitle">Costo promedio: </h4>
                                    <p>${dataDestinos.costo} </p>
                                </div>
                            </div> 
                            <div className="card-body d-flex justify-content-between"> 
                            {dataDestinos.autor?.email==me.email && (<button className="btn btn-danger" onClick={eliminarDestinos}>Eliminar</button>)}
                                
                            </div> 
                        </div> 
                    </div> 
                </div>


            <div className="w-50 ">
                <h3 className="text-center">¿Ya conoces este Destino? Agrega una opinión!</h3>
                {dataDestinos?.opinion?.length > 0 && <Opiniones opiniones={dataDestinos.opinion}/>}
                <div className="d-flex justify-content-center ">
                    <Link to={`/destinos/opiniones/${id}`} className="btn btn-primary">Agregar una opinión</Link>
                </div>
                
            </div>

        </div>
         
        
        
        
            
        
        </>
    )
}

export default UnDestino;