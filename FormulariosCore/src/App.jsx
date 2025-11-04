import { useState } from 'react'
import './App.css'
import Formulario from './components/Formulario'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <h1 className='titulo'>Bienvenido a la liga de SuperHéroes</h1>
        <h3>Registro De Superhéroes</h3>
      < Formulario />
      
    </>
  )
}

export default App
