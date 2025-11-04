import { Link } from "react-router-dom"
import styles  from './../css/Home.module.css'

const Home = ({galeryList})=> {

    return (
        <>
        <h1>Bienvenido a la Galería del Arte Furista</h1>
        <br />
        <ul>
            {galeryList.map((art,index)=> <li key={index} className={styles.list}> < Link to={`/art/${index}`}>{art.name}</Link> </li>)}
        </ul>

        </>
    )

}

export default Home