import express from "express";
import cors from "cors";
import dbConection from "../database/config.js";
import categoria from '../routes/categoria.js'
import usuario from '../routes/usuario.js'

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
