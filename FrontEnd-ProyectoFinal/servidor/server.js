import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/database.config.js'
import cors from 'cors'
import fundacionRoutes from './routes/fundacion.route.js'
import usersRoutes from './routes/Users.route.js'
import emergenciaRoutes from './routes/emergencia.route.js'


dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors())

dbConnect();


app.use('/api/fundaciones', fundacionRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/emergencias', emergenciaRoutes);
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});