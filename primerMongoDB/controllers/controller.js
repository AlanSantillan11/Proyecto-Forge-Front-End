

import Songs from "../models/songs.models.js";

const songsController = {


    getAll : async (req, res) => {
        try{
        const songs = await Songs.find();
        return res.status(201).json(songs);
        }
        catch(e) {
            return res.status(404).json(e)


        }  
    },

    createOne : async (req, res) => {

        const {title, artist, yearOfRelease, genre} = req.body; 
        const newArray = {title, artist, yearOfRelease, genre}

        try{
            const newSong = await Songs.create(newArray)
            res.status(201).json(newSong)
        }catch(e){

            const messages = {};
            if(e.name === "ValidationError"){
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                })
                
            }

            return res.status(400).json({errors : {...messages}})
        }
    },

    getOne : async (req, res) => {

        const id = req.params.id; 


        try{
            const oneSong = await Songs.findById(id)
            if (!oneSong){
                return res.status(404).json({message: "el id no existe"})
            }
            res.status(201).json(oneSong)
        }catch(e){

            return res.status(400).json({error: "el server no funciona"})
        }
    },

    deleteOne : async (req, res) => {
        const id = req.params.id; 
        try{
            const  deleteSong = await Songs.findByIdAndDelete(id)
            if (!deleteSong){
                return res.status(404).json({message: "el id no existe"})
            }
            res.status(201).json({message: "la cancion fue eliminada"}) 

        }catch(e){
            return res.status(400).json(e)

        }
    },
    updateOne : async (req, res) => {
        const id = req.params.id;
        const {title, artist, yearOfRelease, genre} = req.body; 
        const dataToBeUpdate = {};

        if(title){
            dataToBeUpdate.title = title
        }
        if(artist){
            dataToBeUpdate.artist = artist
        }
        if(yearOfRelease){
            dataToBeUpdate.yearOfRelease = yearOfRelease
        }
        if(genre){
            dataToBeUpdate.genre = genre
        }
        try{
            const oneUpdate = await Songs.findByIdAndUpdate(id,dataToBeUpdate,{new : true, runValidator : true})
            if(!oneUpdate){
                return res.status(404).json({message: "no existe el id a actualizar"})
            }
                res.status(201).json(oneUpdate)
        }catch{

            return res.status(400).json(e)

        }



    }


}


export default songsController;