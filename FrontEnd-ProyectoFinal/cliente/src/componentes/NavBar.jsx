import { Link } from "react-router-dom";


const NavBar =({login, logOut})=>{
    return(

        <><div className="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-around ">
            <h1 className="display-2 fw-bold">Destinos</h1>

        {login? (

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={"/destinos"} className="nav-link" aria-current="page" href="#">Todos los Destinos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/destinos/nuevo"} className="nav-link" aria-current="page" href="#">Agregar Destino</Link>
                        </li>
                        <button onClick={logOut} type="button" className="btn" data-bs-toggle="button">Cerrar Sesión</button>
                    </ul>

                </div>
            </nav>

        ):( 
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={"/login"} className="nav-link" aria-current="page" href="#">Inicia sesión</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/registro"} className="nav-link" aria-current="page" href="#">Registrate</Link>
                    </li>
                </ul>            
            </div>
        )}
        </div>
        
        </>
    )
}

export default NavBar