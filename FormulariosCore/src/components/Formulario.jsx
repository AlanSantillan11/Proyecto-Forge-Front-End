import { useState } from "react";
import styles from './../css/Formulario.module.css'; 

function Formulario() {
    const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: ""
});

    const [errores, setErrores] = useState({}); 

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

    const validarFormulario = (e) => {
    e.preventDefault();
    let nuevosErrores = {};


    if (form.nombre.trim().length < 4) {
        nuevosErrores.nombre = "El nombre debe tener al menos 4 caracteres.";
    }


    if (form.apellido.trim().length < 4) {
        nuevosErrores.apellido = "El apellido debe tener al menos 4 caracteres.";
    }

    if (form.correo.trim().length < 10) {
        nuevosErrores.correo = "El correo electrónico es muy corto. Recuerda que debe incluir el @ y una terminación digna de un superhéroe.";
    }

 
    if (form.contrasena.length < 12) {
        nuevosErrores.contrasena = "La contraseña debe tener al menos 12 caracteres ultra secretos.";
    }

    if (form.contrasena !== form.confirmarContrasena) {
        nuevosErrores.confirmarContrasena = "Las contraseñas no coinciden. ¡Ningún superhéroe puede tener dudas sobre su clave!";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
        alert(`¡Superhéroe ${form.nombre} ${form.apellido} creado con exito!`);
        setForm({
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        confirmarContrasena: ""
    });
    }
};

    return (
    <div className={styles.formContainer}>
        <div className={styles.formCard}>
        <h3 className={styles.titulo}>Registro de Superhéroes</h3>

        <form onSubmit={validarFormulario}> 
            <label className={styles.label}>Nombre:</label>
            <input
            className={styles.input}
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
        />
            {errores.nombre && <p className={styles.error}>{errores.nombre}</p>} 

            <label className={styles.label}>Apellido:</label>
            <input
            className={styles.input}
            type="text"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
        />
            {errores.apellido && <p className={styles.error}>{errores.apellido}</p>}

            <label className={styles.label}>Correo Electrónico:</label>
            <input
            className={styles.input}
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            />
            {errores.correo && <p className={styles.error}>{errores.correo}</p>}

            <label className={styles.label}>Contraseña:</label>
            <input
            className={styles.input}
            type="password"
            name="contrasena"
            value={form.contrasena}
            onChange={handleChange}
            />
            {errores.contrasena && <p className={styles.error}>{errores.contrasena}</p>}

            <label className={styles.label}>Confirmar Contraseña:</label>
            <input
            className={styles.input}
            type="password"
            name="confirmarContrasena"
            value={form.confirmarContrasena}
            onChange={handleChange}
            />
            {errores.confirmarContrasena && <p className={styles.error}>{errores.confirmarContrasena}</p>}

            <button className={styles.boton} type="submit">
            Crear Superhéroe
            </button>
        </form>
        </div>
    </div>
);
}

export default Formulario;
