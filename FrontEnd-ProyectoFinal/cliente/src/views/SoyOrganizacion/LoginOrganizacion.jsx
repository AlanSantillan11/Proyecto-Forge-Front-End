import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode"; 
import Styles from "../../componentes/Botones/BotonPrimario.module.css";

const LoginOrganizacion = ({ setMeFundacion, setLogin }) => {
  const [data, setData] = useState({ correo: "", contraseña: "" });
  const [errors, setErrors] = useState({});
  const navegar = useNavigate();

  const actualizarEstado = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const iniciarSesion = (e) => {
    e.preventDefault();
    const URL = "http://localhost:8080/api/fundaciones/login";

    axios
      .post(URL, data)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setLogin(true);

        const decoded = jwt_decode(token);
        setMeFundacion({  _id: decoded.id, nombre: decoded.nombre, correo: decoded.correo,
        });

        setErrors({});
        navegar("/home");
      })
      .catch((e) => setErrors(e.response?.data?.errors));
  };

  return (
    <>
      <h2 className="text-center">Inicia Sesión!</h2>
      <div className="d-flex justify-content-center">
        <form className="row w-50" onSubmit={iniciarSesion}>
          <div className="mb-3">
            <label htmlFor="correo">Correo:</label>
            <input
              type="correo"
              name="correo"
              id="correo"
              value={data.correo}
              onChange={actualizarEstado}
              className="form-control form-control-lg"
            />
            {errors?.correo && <p style={{ color: "red" }}>{errors.correo}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              type="password"
              name="contraseña"
              id="contraseña"
              value={data.contraseña}
              onChange={actualizarEstado}
              className="form-control form-control-lg"
            />
            {errors?.contraseña && <p style={{ color: "red" }}>{errors.contraseña}</p>}
          </div>

          <button className={`btn ${Styles.btnPrimario}`}>Iniciar Sesión</button>
        </form>
      </div>
    </>
  );
};

export default LoginOrganizacion;
