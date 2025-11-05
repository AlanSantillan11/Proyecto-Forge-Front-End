import express from 'express';
import { faker } from '@faker-js/faker';

const app = express();
const PORT = 8000;


const generarCancion = () => {
    return {
    id: faker.string.uuid(),
    titulo: faker.music.songName(),
    artista: faker.music.artist(),
    album: faker.music.album(),
    duracion: `${faker.number.int({ min: 2, max: 5 })}:${String(faker.number.int({ min: 0, max: 59 })).padStart(2, '0')}`,
    genero: faker.music.genre(),
    fechaLanzamiento: faker.date.past({ years: 30 }).toISOString().split('T')[0],
    };
};


const generarPlaylist = () => {
    const cantidad = faker.number.int({ min: 3, max: 10 });
    const canciones = [];
    for (let i = 0; i < cantidad; i++) {
    canciones.push(generarCancion());   
    }
    return {
    idPlaylist: faker.string.uuid(),
    nombre: faker.word.words({ count: 2 }),
    descripcion: faker.lorem.sentence(),
    canciones: canciones,
    creador: faker.person.fullName(),
    fechaCreacion: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
    };
};


app.get('/api/cancion', (req, res) => {
    const cancion = generarCancion();
    res.json(cancion);
});


app.get('/api/playlist', (req, res) => {
    const playlist = generarPlaylist();
    res.json(playlist);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});