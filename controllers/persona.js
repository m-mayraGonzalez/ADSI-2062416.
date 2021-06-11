import Persona from "../models/persona.js";

const persona = {
  personaGet: async (req, res) => {
    const { value } = req.query;
    const persona = await Persona.find({
      $or: [
        { nombre: new RegExp(value, "i") },
        { tipoDocumento: new RegExp(value, "i") },
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
    const persona = await Persona.findByIdAndUpdate(id, { estado: 1 });

    res.json({
      persona,
    });
  },

  personaDesactivar: async (req, res) => {
    const { id } = req.params;
    const persona = await Persona.findByIdAndUpdate(id, { estado: 0 });

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
