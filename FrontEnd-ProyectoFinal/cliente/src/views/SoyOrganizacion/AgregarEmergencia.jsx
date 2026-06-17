import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../../componentes/Botones/BotonPrimario.module.css"

const AgregarEmergencia = ({ listaEmergencias, setListaEmergencias, login, meFundacion }) => {
  
  const [errors, setErrors] = useState({});
  const navegar = useNavigate();
  const [data, setData] = useState({titulo: "", cantidad_personas: "", ciudad: "", descripcion: "", habilidades: "", fundacion: "" });

  if (data.fundacion === "") {
    setData(prev => ({ ...prev, fundacion: meFundacion._id }));
  }


  const actualizarEstado = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const agregarEmergencia = (e) => {
    e.preventDefault();


    axios.post( "http://localhost:8080/api/emergencias/new", data,
      { headers: { token_user: localStorage.getItem("token") } }).then(res => {

        setListaEmergencias([...listaEmergencias, res.data]);
        navegar("/emergencias");

      })
      .catch(e=>
        setErrors(e.response.data.errors))
  };  
  
  
  return (
    <>
      <div className="d-flex justify-content-center">

        <form className="w-50" onSubmit={agregarEmergencia}>

            <div className="mb-3">
                <h3 className="form-label">Organización: {meFundacion?.nombre}</h3>
            </div>

            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">Titulo:</label>
                <input  className="form-control" type="text" name="titulo" id="titulo" value={data.titulo} onChange={actualizarEstado} />
                {errors?.titulo && <p style={{ color: "red" }}>{errors.titulo}</p>}
            </div>

            <div className="mb-3">
               <label htmlFor="cantidad_personas" className="form-label">Cantidad de Voluntarios:</label>
                <input className="form-control"  type="number" name="cantidad_personas"  id="cantidad_personas"  value={data.cantidad_personas} onChange={actualizarEstado} />
                {errors?.cantidad_personas && <p style={{ color: "red" }}>{errors.cantidad_personas}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor="ciudad" className="form-label">Ciudad:</label>
                <input className="form-control" type="text" name="ciudad" id="ciudad" value={data.ciudad} onChange={actualizarEstado}/>
                {errors?.ciudad && <p style={{ color: "red" }}>{errors.ciudad}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripcion:</label>
                <input className="form-control" type="text" name="descripcion" id="descripcion" value={data.descripcion} onChange={actualizarEstado} />
                {errors?.descripcion && <p style={{ color: "red" }}>{errors.descripcion}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor="habilidades" className="form-label">Habilidades Necesarias:</label>
                <input className="form-control" type="text" name="habilidades" id="habilidades" value={data.habilidades} onChange={actualizarEstado} />
                {errors?.habilidades && <p style={{ color: "red" }}>{errors.habilidades}</p>}
            </div>

            <button className={Styles.btnPrimario} type="submit" >Crear Emergencia</button>

        </form>
        
      </div>
    </>
  );
};

export default AgregarEmergencia;
