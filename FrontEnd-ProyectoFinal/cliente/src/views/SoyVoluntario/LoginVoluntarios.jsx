import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "../../componentes/Botones/BotonPrimario.module.css";

const Login = ({ login, setLogin }) => {
    const [estado, setEstado] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const navegar = useNavigate();

    const actualizarEstado = (e) => {
        setEstado({ ...estado, [e.target.name]: e.target.value });
    };

    const iniciarSesion = (e) => {
        e.preventDefault();
        const URL = "http://localhost:8080/api/users/login";

        axios
        .post(URL, estado)
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            setLogin(true);
            setErrors({});
            console.log("NAVEGANDO A:", "/emergencias");
            navegar("/emergencias");
        })
        .catch((e) => {
            console.error("Error login usuario (front):", e.response?.data);
            // esperamos { errors: { email: "...", password: "..." } }
            setErrors(e.response?.data?.errors || {});
        });
    };

    return (
        <>
        <h2 className="text-center">Inicia Sesión!</h2>
        <div className="d-flex justify-content-center">
            <form className="row w-50" onSubmit={iniciarSesion}>
            <div className="mb-3">
                <label htmlFor="email">email:</label>
                <input
                type="email"
                name="email"
                id="email"
                value={estado.email}
                onChange={actualizarEstado}
                className="form-control form-control-lg"
                />
                {errors?.email && (
                <p style={{ color: "red" }}>{errors.email}</p>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="password">contraseña:</label>
                <input
                type="password"
                name="password"
                id="password"
                value={estado.password}
                onChange={actualizarEstado}
                className="form-control form-control-lg"
                />
                {errors?.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
                )}
            </div>

            <button className={`btn ${Styles.btnPrimario}`}>
                Iniciar Sesión
            </button>
            </form>
        </div>
        </>
    );
};

export default Login;
