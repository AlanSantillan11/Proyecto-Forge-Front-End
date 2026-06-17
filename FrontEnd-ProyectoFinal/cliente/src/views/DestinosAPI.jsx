import axios from "axios";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DestinosAPI = ({ listaDeDestinos, setListaDeDestinos, login, setLogin, setMe, me }) => {
  const navegar = useNavigate();
  const getDataDestinos = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/destinos", {
        headers: { token_usuario: token },
      })
      .then((response) => {
        setListaDeDestinos(response.data);
        setLogin(true);

        try {
          const decoded = jwtDecode(token);
          setMe(decoded);
        } catch (error) {
          console.error("Error al decodificar token:", error);
          setMe({});
        }
      })
      .catch((error) => {
        console.error("Error al obtener destinos:", error.response?.data || error.message);
        setLogin(false);
        navegar("/login");
      });
  };

  // 2️⃣ Llamar a la función dentro de useEffect después de definirla
  useEffect(() => {
    getDataDestinos();
  }, []);

  return (
    <>
      <h2 className="text-center">Todos los Destinos</h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Lugar</th>
              <th scope="col">Detalle</th>
              <th scope="col">Modificar</th>
            </tr>
          </thead>
          <tbody>
            {listaDeDestinos.map((destino, index) => (
              <tr key={index}>
                <td>{destino.lugar}</td>
                <td>
                  <Link to={`/destinos/${destino._id}`}>Ver</Link>
                </td>
                <td>
                  {destino.autor?.email === me?.email ? (
                    <Link to={`/destinos/actualizar/${destino._id}`}>Editar</Link>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DestinosAPI;
