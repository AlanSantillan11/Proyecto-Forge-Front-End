import { useState, useEffect } from 'react'
import './App.css'
import Imagenes from './components/Imagenes'
import axios from 'axios'

function App() {
  const [imagenes, setImagenes] = useState([]);

  const obtenerImagenes = () => {
    const URL = 'https://api.thecatapi.com/v1/images/search';
    axios.get(URL)
      .then(response => {
        setImagenes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener imagen:', error);
      });
  };

  useEffect(() => {
    obtenerImagenes();
  }, []);

  return (
    
    <div className="container text-center mt-5">
      <h1>Imagen Random</h1>
      {imagenes.map((imagen, index) => (
        <div key={index} className="d-flex flex-column align-items-center">
          <img
            src={imagen.url}
            alt="imagen random"
            className="rounded shadow mb-4"
            width={400}
            style={{ borderRadius: '15px' }}
          />
        </div>
      ))}

      <Imagenes obtenerImagenes={obtenerImagenes} />
    </div>
  );
}

export default App;
