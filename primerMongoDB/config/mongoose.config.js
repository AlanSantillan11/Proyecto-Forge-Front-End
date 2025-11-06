import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI_MONGODB = process.env.MONGODB_URI;

async function dbConnect() {
    try {
        await mongoose.connect(URI_MONGODB, {
        dbName: 'librosDB',
    });
    console.log("Conexión exitosa a MongoDB");
    } catch (error) {
    console.error("Error al conectar a MongoDB", error);
    throw error;
    }
}

export default dbConnect;