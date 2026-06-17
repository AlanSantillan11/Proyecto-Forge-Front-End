import { useEffect, useState } from "react";
import axios from "axios"




const Opiniones = ({ opiniones }) => {
    return (
        <div className="row d-flex justify-content-center p-4">
            <div className="card">
                <h2 className="text-center">Opiniones</h2>
                <div className="card-body">
                    {opiniones?.length > 0 ? (
                        opiniones.map(opi => (
                            <div key={opi._id} className="mb-3 p-2 border rounded">
                                <b>{opi.autor?.primerNombre} {opi.autor?.apellido}</b>
                                <p>{opi.opinion}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay opiniones todavía.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Opiniones