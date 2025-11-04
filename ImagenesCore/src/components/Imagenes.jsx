


const Imagenes = ({ obtenerImagenes }) => {
    return (
        <div className="text-center mt-4">

        <button
            className="btn btn-primary "
            onClick={obtenerImagenes}
        >
        Buscar nueva Imagen Random
        </button>
        </div>
    );
};

export default Imagenes;
