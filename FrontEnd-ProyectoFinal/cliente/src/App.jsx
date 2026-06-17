import { useState } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import './App.css'
import NoFound from './componentes/NoFound.jsx'
import NavBar from './componentes/NavBar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'   // <-- import bootstrap here
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // optional, for JS components like modals
import Login from './views/Login.jsx'
import Registro from './views/Registro.jsx'
import UnDestino from './views/UnDestino.jsx'
import AgregarDestinos from './views/AgregarDestinos.jsx'
import ActualizarDestinos from './views/ActualizarDestinos.jsx'
import DestinosAPI from './views/DestinosAPI.jsx'
import AgregarOpinion from './views/AgregarOpinion.jsx'

function App() {
  const [listaDeDestinos, setListaDeDestinos]= useState([]);
  const [login, setLogin]= useState(false)
  const [me, setMe]= useState({})
  const navegar = useNavigate();


  const logOut= ()=>{
    localStorage.removeItem("token")
    setLogin(false)
    navegar("/login")
  }

  return (
    <>
    
      
        <NavBar login ={login} logOut={logOut}/>  


      <Routes>
        <Route path="*" element={<NoFound/>}/>
        <Route path="/" element={<h1 className="text-center">Bienvenido {me.primerNombre}!</h1>} />

        <Route path="/login" element={<Login login={login} setLogin={setLogin}/> } />
        <Route path="/registro" element={<Registro login={login} setLogin={setLogin} /> } />

        <Route path="/destinos" element= {<DestinosAPI listaDeDestinos={listaDeDestinos} setListaDeDestinos={setListaDeDestinos} login={login} setLogin={setLogin} setMe={setMe} me={me}/>}/>
        <Route path="/destinos/:id" element={<UnDestino listaDeDestinos={listaDeDestinos} setListaDeDestinos={setListaDeDestinos} logOut={logOut} setLogin={setLogin}  me={me}/> } />
        <Route path="/destinos/nuevo" element={<AgregarDestinos listaDeDestinos={listaDeDestinos} setListaDeDestinos={setListaDeDestinos} logOut={logOut} login={login} me={me}/> } />
        <Route path="/destinos/actualizar/:id" element={<ActualizarDestinos listaDeDestinos={listaDeDestinos} setListaDeDestinos={setListaDeDestinos} logOut={logOut} setLogin={setLogin}/> } />
        
        <Route path="/destinos/opiniones/:id" element={<AgregarOpinion listaDeDestinos={listaDeDestinos} setListaDeDestinos={setListaDeDestinos} logOut={logOut} login={login} setLogin={setLogin}/> } />
        

        
      </Routes>
    </>
  )
}

export default App
