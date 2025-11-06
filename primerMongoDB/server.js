import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import songsRoutes from './routes/songs.routes.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({extended : true}));

dbConnect();


app.use('/api/canciones',songsRoutes)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});