
import './App.css'
import './index.css'
import TarjetaProducto from './components/TarjetaProducto'

function App() {
  const productos = [
    {nombre: "Laptop", precio: 1500, descripcion: "Una potente latop para trabajar y jugar.", cantidad: 10},
    {nombre: "Smartphone", precio: 800, descripcion: "Un smarthphone de ultima generacion con una de las mejores cámaras.", cantidad: 0},
    {nombre: "Auriculares", precio: 200, descripcion: "Auriculares conc ancelacion de ruido No escucharas nada a tu alrededor.", cantidad: 5},
    {nombre: "Monitor", precio: 300, descripcion: "Modito 4k para una experiencia visual increible.", cantidad: 10},
  ]
  return (
    <>

    <div><h1 className='titulo'>TechStore - Tu Destino para la Mejor Tecnología</h1></div>

    <div className='cartasP'>
      {productos.map((producto)=> < TarjetaProducto nombre={producto.nombre} precio={producto.precio} descripcion ={producto.descripcion} cantidad={producto.cantidad} /> )}
    </div>
    
    </>

  )
}

export default App
