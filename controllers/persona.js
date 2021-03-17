import Persona from "../models/persona.js";
import bcryptjs from 'bcrypt'
import { generarPJWT } from "../middlewares/validar-jwt.js";

const persona = {
  personaGet: async (req, res) => {
    const { value } = req.query;
    const persona = await Persona.find({
      $or: [
        { tipoPersona: new RegExp(value, "i") },
        { nombre: new RegExp(value, "i") },
        { tipoDocumento: new RegExp(value, "i") },
        { numDocumento: new RegExp(value, "i") },
        { direccion: new RegExp(value, "i") },
        { telefono: new RegExp(value, "i") },
        { email: new RegExp(value, "i") },
      ],
    }).sort({ createdAt: -1 });

    res.json({
        persona,
    });
  },

  personaPost: async (req, res) => {
    const { tipoPersona, nombre, tipoDocumento, numDocumento, direccion, telefono, email} = req.body;
    const persona = new Persona({ tipoPersona, nombre, tipoDocumento, numDocumento, direccion, telefono, email });
    await persona.save();

    res.json({
        persona,
    });
  },

  personaById: async (req, res) => {
    const { id } = req.params;
    const persona = await Persona.findOne({ _id: id });

    res.json({
        persona,
    });
  },

  login:async(req, res)=>{
    const { email, numDocumento}=req.body;
    const persona=await Persona.findOne({email, numDocumento})
    if(! persona){
      return res.json({
        msg:'Persona/numDocumento no son correctos'
      })
    }
    if(persona.estado===0){
      return res.json({
        msg:'Persona/numDocumento no son correctos'
      })
    }
    const validarnumDocumento=bcryptjs.compareSync(numDocumento, persona.numDocumento)
    if(! validarnumDocumento){
      return res.json({
        msg:'Persona/numDocumento no son correctos'
      })
    }

    const token = await generarPJWT(persona._id)

    return res.json({
      persona,
      token
    })
  },

  personaPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, estado, ...resto } = req.body;
    const persona = await Persona.findByIdAndUpdate(id, resto);

    res.json({
        persona,
    });
  },

  personaActivar: async (req, res) => {
    const { id } = req.params;
    const persona = await Persona.findOneAndUpdate(id, { estado: 1 });

    res.json({
        persona,
    });
  },

  personaDesactivar: async (req, res) => {
    const { id } = req.params;
    const persona = await Persona.findOneAndUpdate(id, { estado: 0 });

    res.json({
        persona,
    });
  },

  personaDelete: async (req, res) => {
    const { id } = req.params;
    const persona = await Persona.findByIdAndDelete(id);

    res.json({
        persona,
    });
  },
};

export default persona;
