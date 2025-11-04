import { useNavigate, useParams } from "react-router-dom";
import styles  from './../css/ArtPiece.module.css'

const ArtPiece = ({galeryList})=> {
    const params = useParams();
    const idParams = Number(params.id)
    const navigate = useNavigate();

    
    const artPiece = galeryList.find((art,index)=> index===idParams)


    if (!artPiece) {
        return <div>Obra no encontrada</div>;
    }

    

    return(
        <>
        <h1>{artPiece.name}</h1>
        <br />
        <img className={styles.img} src={artPiece.img} alt={artPiece.name} />
        <div>
            <button className={`${styles.btns} btn btn-success`} onClick={()=>navigate(`/art/${idParams-1}`)} disabled={idParams===0}>Anterior</button>
            <button className={`${styles.btns} btn btn-success`} onClick={()=>navigate('/home')}>Inicio</button>
            <button className={`${styles.btns} btn btn-success`} onClick={()=>navigate(`/art/${idParams+1}`)} disabled={idParams===(galeryList.length -1)}>Siguiente</button>
    
        </div>
        </>
    )
}

export default ArtPiece;