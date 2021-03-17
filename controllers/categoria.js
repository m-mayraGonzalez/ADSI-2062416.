import Categoria from "../models/categoria.js";
import bcryptjs from 'bcrypt'
import { generarCJWT } from "../middlewares/validar-jwt.js";

const categoria = {
  categoriaGet: async (req, res) => {
    const { value } = req.query;
    const categoria = await Categoria.find({
      $or: [
        { nombre: new RegExp(value, "i") },
        { descripcion: new RegExp(value, "i") },
      ],
    }).sort({ createdAt: -1 });

    res.json({
      categoria,
    });
  },

  categoriaPost: async (req, res) => {
    const { nombre, descripcion } = req.body;
    const categoria = new Categoria({ nombre, descripcion });
    await categoria.save();

    res.json({
      categoria,
    });
  },

  categoriaById: async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findOne({ _id: id });

    res.json({
      categoria,
    });
  },

  login:async(req, res)=>{
    const {nombre, descripcion}=req.body;
    const categoria=await Categoria.findOne({nombre, descripcion})
    if(! categoria){
      return res.json({
        msg:'Categoria/nombre no es correcto'
      })
    }
    if(categoria.estado===0){
      return res.json({
        msg:'Categoria/nombre no es correcto'
      })
    }
    const validarNombre=bcryptjs.compareSync(nombre, categoria.nombre)
    if(! validarNombre){
      return res.json({
        msg:'Categoria/nombre no es correcto'
      })
    }

    const token = await generarCJWT(categoria._id)

    return res.json({
      categoria,
      token
    })
  },

  categoriaPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, estado, ...resto } = req.body;
    const categoria = await Categoria.findByIdAndUpdate(id, resto);

    res.json({
      categoria,
    });
  },

  categoriaActivar: async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findOneAndUpdate(id, { estado: 1 });

    res.json({
      categoria,
    });
  },

  categoriaDesactivar: async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findOneAndUpdate(id, { estado: 0 });

    res.json({
      categoria,
    });
  },

  categoriaDelete: async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndDelete(id);

    res.json({
      categoria,
    });
  },
};

export default categoria;
