import Compras from "../models/ventas.js"; 

const compras = {
    comprasGet: async (req, res) => {
    const {value} = req.query;
    const compras = await Compras
    .populate('usuario, persona', 'tipoComprobante, serieComprobante, numComprobante, impuestos, total, detalle,  _id, articulo, cantidad, precio')
    .find({
      $or: [
        { usuario: new RegExp(value, "i") },
        { persona: new RegExp(value, "i") },
        { tipoComprobante: new RegExp(value, "i") },
        { serieComprobante: new RegExp(value, "i") },
        { numComprobante: new RegExp(value, "i") },
        { impuestos: new RegExp(value, "i") },
        { total: new RegExp(value, "i") },
        { detalle: new RegExp(value, "i") },
        { _id: new RegExp(value, "i") },
        { articulo: new RegExp(value, "i") },
        { cantidad: new RegExp(value, "i") },
        { precio: new RegExp(value, "i") },
      ],
    })
    .sort({ createdAt: -1 });

    res.json({
        compras,
    });
  },

  comprasPost: async (req, res) => {
    const { usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuestos, total, detalle,  _id, articulo, cantidad, precio}= req.body;
    const compras = new Compras({ usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuestos, total, detalle, _id, articulo, cantidad, precio});
    await compras.save();

    res.json({
        compras,
    });
  },

  comprasById: async (req, res) => {
    const { id } = req.params;
    const compras = await Compras.findById(id);

    res.json({
        compras,
    });
  },

  comprasPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, estado, ...resto } = req.body
    const compras = await Compras.findByIdAndUpdate(id, resto);

    res.json({
        compras,
    });
  },

  comprasActivar: async (req, res) => {
    const { id } = req.params;
    const compras = await Compras.findOneAndUpdate(id, { estado: 1 });

    res.json({
        compras,
    });
  },

  comprasDesactivar: async (req, res) => {
    const { id } = req.params;
    const compras = await Compras.findOneAndUpdate(id, { estado: 0 });

    res.json({
        compras,
    });
  },

  comprasDelete: async (req, res) => {
    const { id } = req.params;
    const compras = await Compras.findByIdAndDelete(id);

    res.json({
        compras,
    });
  },
};

export default compras;