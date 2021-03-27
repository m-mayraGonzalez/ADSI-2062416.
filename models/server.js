import express from "express";
import cors from "cors";
import dbConection from "../database/config.js";
import categoria from '../routes/categoria.js';
import usuario from '../routes/usuario.js'; 
import persona from '../routes/persona.js'; 
import articulos from '../routes/articulos.js'
import ventas from '../routes/ventas.js'
import compras from '../routes/compras.js'

class Server {
  constructor() {
    this.port = process.env.PORT;

    this.app = express();

    this.dbConexion();

    this.middlewares();

    this.routes();
  }

  routes() {
    this.app.use('/api/categoria', categoria )
    this.app.use('/api/usuario', usuario )
    this.app.use('/api/persona', persona)
    this.app.use('/api/articulos', articulos)
    this.app.use('/api/ventas', ventas)
    this.app.use('/api/compras', compras)

    
  }

  async dbConexion() {
    await dbConection();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export { Server };


//Mayra Marcela González Rojas
