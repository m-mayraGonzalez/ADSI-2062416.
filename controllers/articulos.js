import Articulos from "../models/articulos.js";

const articulos = {
    articulosGet: async (req, res) => {
    const { value } = req.query;
    const articulos = await Articulos.find({
      $or: [
        { categoria: new RegExp(value, "i") },
        { nombre: new RegExp(value, "i") },
        { codigo: new RegExp(value, "i") },
        { descripcion: new RegExp(value, "i") },
        { precioVenta: new RegExp(value, "i") },
        { stock: new RegExp(value, "i") },
      ],
    }).sort({ createdAt: -1 });

    res.json({
        articulos,
    });
  },

  articulosPost: async (req, res) => {
    const { categoria, nombre, codigo, descripcion, precioVenta, stock} = req.body;
    const articulos = new Articulos({ categoria, nombre, codigo, descripcion, precioVenta, stock});
    const salt=bcryptjs.genSaltSync();
    articulos.codigo=bcryptjs.hashSync(codigo, salt)
    await articulos.save();

    res.json({
        articulos,
    });
  },

  articulosById: async (req, res) => {
    const { id } = req.params;
    const articulos = await Articulos.findById(id);

    res.json({
        articulos,
    });
  },

  articulosPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, estado, ...resto } = req.body

    if(codigo){
      const salt=bcryptjs.genSaltSync();
      resto.codigo=bcryptjs.hashSync(codigo, salt)
    }

    const articulos = await Articulos.findByIdAndUpdate(id, resto);

    res.json({
        articulos,
    });
  },

  articulosActivar: async (req, res) => {
    const { id } = req.params;
    const articulos = await Articulos.findOneAndUpdate(id, { estado: 1 });

    res.json({
        articulos,
    });
  },

  articulosDesactivar: async (req, res) => {
    const { id } = req.params;
    const articulos = await Articulos.findOneAndUpdate(id, { estado: 0 });

    res.json({
        articulos,
    });
  },

  articulosDelete: async (req, res) => {
    const { id } = req.params;
    const articulos = await Articulos.findByIdAndDelete(id);

    res.json({
        articulos,
    });
  },
};

export default articulos;