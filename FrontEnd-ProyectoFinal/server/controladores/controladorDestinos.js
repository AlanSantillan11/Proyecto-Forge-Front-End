import {Destinos }from "../modelos/modeloDestinos.js"
import { Opinion } from "../modelos/modeloOpiniones.js";


const controladorDestinos={
    getAll: async (req, res) => {
    try {
        const destinos = await Destinos.find().populate("autor", "primerNombre apellido email");
        return res.status(200).json(destinos);
    } catch (e) {
        return res.status(500).json({ error: e.message || "Error desconocido en getAll" });
    }
},

    createOne : async (req, res)=>{
        const {lugar, descripcion, tips, epoca, costo}  = req.body;
        const nuevoArray = {lugar, descripcion, tips, epoca, costo} ;

        nuevoArray["autor"]=req.infoUsuario.id
        try{
            const nuevoDestinos = await Destinos.create(nuevoArray)
            res.status(201).json(nuevoDestinos)
        }
        catch(e){
            const message= {}
                if (e.name ==="ValidationError"){
                    Object.keys(e.errors).forEach(key => {
                        message[key]= e.errors[key].message
                    });
                }

            return res.status(400).json({errors : {...message}})
        }
    },
    getOne: async(req, res) => {
        const id= req.params.id;
        try{
            const unDestino = await Destinos.findById(id).populate("autor", "primerNombre apellido email" )
            if(!unDestino){
                return res.status(404).json({message: "La id indicada no existe"})
            }
            res.status(201).json(unDestino)
        } catch(e) {
            return res.status(400).json(e)
        }
    },
    deleteOne: async (req,res)=>{
        const id= req.params.id;
        try{
            const borrarDestino= await Destinos.findByIdAndDelete(id)
            if(!borrarDestino){
                return res.status(404).json({message: "No se encontro "})
            }
            res.status(201).json({message: "El destino fue borrado con éxito"})
        }catch(e){
            res.status(400).json(e)
        }
    },
    updateOne : async (req,res)=>{
        const id= req.params.id;
        const {lugar, descripcion, tips, epoca, costo} = req.body;
        const datosPorActualizar={};
        if(lugar){
            datosPorActualizar.lugar=lugar
        }
        if(descripcion){
            datosPorActualizar.descripcion=descripcion
        }
        if(tips){
            datosPorActualizar.tips=tips
        }
        if(epoca){
            datosPorActualizar.epoca=epoca
        }
        if(costo){
            datosPorActualizar.costo=costo
        }

        try{
            const actualizarDestinos= await Destinos.findByIdAndUpdate(id, datosPorActualizar, {new: true, runValidators:true})
            if(!actualizarDestinos){
                return res.status(400).json({message: "Este id no existe"})
            }
            res.status(201).json(actualizarDestinos)
        }

        catch(e){
            const message= {}
                if (e.name === "ValidationError") {
                    Object.keys(e.errors).forEach(key => {
                        message[key]= e.errors[key].message
                    });
                }
            res.status(400).json({errors : {...message}})
        }
    },
    agregarOpinion : async (req,res) => {
        const { opinion } = req.body;
        const id = req.params.id;

        try {
            const guardarOpinion = await Opinion.create({
                opinion, autor: req.infoUsuario.id
            });

            const destinoActualizado = await Destinos.findByIdAndUpdate( id, { $push: { opinion: guardarOpinion._id } },{ new: true })

                return res.status(200).json(destinoActualizado);

            } catch (e) {
                console.log(e);
                return res.status(400).json(e);
            }}
}


export default controladorDestinos;