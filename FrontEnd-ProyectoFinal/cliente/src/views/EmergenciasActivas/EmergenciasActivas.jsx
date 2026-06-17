import axios from "axios";
import { useEffect } from "react";
import TarjetaEmergencia from "../../componentes/Tarjetas/TarjetaEmergencia.jsx"
import { useState } from "react";

const EmergenciasActivas = ({listaEmergencias, setListaEmergencias}) => {
  const [errors, setErrors]= useState({})
  
  const getDataEmergencias = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/emergencias", {
        headers: { token_usuario: token || "" },
      })
      .then((response) => {
        setListaEmergencias(response.data);
      })
      .catch(e=>setErrors(e.response?.data?.errors));
  };
  useEffect(() => {
    getDataEmergencias();
  }, []);

  return (
    <>
      <h3 className="text-center">Emergencias Activas</h3>
      <p className="text-center" style={{ color: "#424655" }}>Encuentra oportunidades para ayudar en tu área. Cada voluntario hace la diferencia.</p>
      <div className="px-4 d-flex gap-4">
        <TarjetaEmergencia listaEmergencias={listaEmergencias}/>
      </div>
      


    </>
  );
};

export default EmergenciasActivas;
