import Usuario from "../models/usuario.js";
import bcryptjs from 'bcrypt'
import { generarJWT } from "../middlewares/validar-jwt.js";

const usuario = {
  usuarioGet: async (req, res) => {
    const { value } = req.query;
    const usuarios = await Usuario.find({
      $or: [
        { nombre: new RegExp(value, "i") },
        { email: new RegExp(value, "i") },
        
      ],
    }).sort({ createdAt: -1 });

    res.json({
      usuarios,
    });
  },

  usuarioPost: async (req, res) => {
    const { nombre, email, password, rol} = req.body;
    const usuario = new Usuario({ nombre, email, password, rol});
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password, salt)
    await usuario.save();

    res.json({
      usuario,
    });
  },

  usuarioById: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    res.json({
      usuario,
    });
  },

  login:async(req, res)=>{
    const {email, password}=req.body;
    const usuario=await Usuario.findOne({email, password})
    if(! usuario){
      return res.json({
        msg:'Usuario/password no son correctos email'
      })
    }
    if(usuario.estado===0){
      return res.json({
        msg:'Usuario/password no son correctos estado'
      })
    }
    const validarPassword=bcryptjs.compareSync(password, usuario.password)
    if(! validarPassword){
      return res.json({
        msg:'Usuario/password no son correctos pass'
      })
    }

    const token = await generarJWT(usuario._id)

    return res.json({
      usuario,
      token
    })
  },

  usuarioPut: async (req, res) => {
    const { id } = req.params;
    const { _id, email, createdAt, __v, estado, rol, password, ...resto } = req.body

    if(password){
      const salt=bcryptjs.genSaltSync();
      resto.password=bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
      usuario,
    });
  },

  usuarioActivar: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOneAndUpdate(id, { estado: 1 });

    res.json({
      usuario,
    });
  },

  usuarioDesactivar: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOneAndUpdate(id, { estado: 0 });

    res.json({
      usuario,
    });
  },

  usuarioDelete: async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);

    res.json({
      usuario,
    });
  },
};

export default usuario;
