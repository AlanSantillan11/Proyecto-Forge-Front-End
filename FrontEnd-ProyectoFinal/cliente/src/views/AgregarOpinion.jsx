import { useEffect, useState } from "react"
import Opiniones from "../componentes/Opiniones"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
const AgregarOpinion = ({listaDeDestinos, setListaDeDestinos, logOut, login})=>{

    const { id } = useParams(); 
    const [data, setData]= useState({ opinion:"", autor: {}})
    const [errors, setErrors]= useState({})
    const [destinoActual, setDestinoActual] = useState(null);

    const navegar = useNavigate();

    const actualizarEstado= (e)=>{
        setData({...data,[e.target.name] : e.target.value})
    }

    const agregarOpinion= (e)=>{
        e.preventDefault();
        const URL = `http://localhost:8080/api/destinos/opiniones/${id}`
        axios.post(URL, data, {headers : {token_usuario : localStorage.getItem("token")}}).then(
            response=> {
                setListaDeDestinos(previus =>
                    previus.map(destino => destino._id === id ? response?.data : destino)
                );

                navegar(`/destinos/${id}`)
            }
    
        ).catch ( e=>{
            setErrors(e.response?.data?.errors)
            if(!login){
                logOut()}
        },[]
    )}

    

    useEffect(() => {
        const URL = `http://localhost:8080/api/destinos/${id}`;
        axios.get(URL, {headers: {token_usuario: localStorage.getItem("token")}})
            .then(res => setDestinoActual(res.data))
            .catch(err => console.log(err));
    }, [id]);

    

    return(

        <div className="d-flex p-4">
            {destinoActual?.opinion?.length > 0 ? <Opiniones opiniones={destinoActual.opinion}/> : <div className="d-flex w-50"><h3>Sé el primero en opinar!</h3></div>
            }

            <div className=" w-50">
                <form className="row " onSubmit={(e)=>agregarOpinion(e)}>
                    <div className="mb-3 ">

                        <label htmlFor="opinion">Agregá tu opinión del Destino:</label>
                        <input type="text"name="opinion" id="opinion" value={data.opinion} onChange={(e)=>{actualizarEstado(e)}} className="form-control form-control-lg" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                        {errors?.opinion && <p style={{color : "red"}}>{errors.opinion}</p>}
                    
                    </div>

                
                    

                    <button className="btn btn-success">Agregar Opinión</button>
                </form>
            </div>
        </div>
    )
}



export default AgregarOpinion