import Ventas from "../models/ventas.js"; 

const ventas = {
  ventasGet: async (req, res) => {
    const { value } = req.query;
    const ventas = await Ventas
    .populate('usuario, persona', 'tipoComprobante, serieComprobante, numComprobante, impuestos, total, detalle,  _id, articulo, cantidad, precio, descuento')
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
        { descuento: new RegExp(value, "i") },
      ],
    })
    .sort({ createdAt: -1 });

    res.json({
      ventas,
    });
  },

  ventasPost: async (req, res) => {
    const { usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuestos, total, detalle,  _id, articulo, cantidad, precio,descuento}= req.body;
    const ventas = new Ventas({ usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuestos, total, detalle, _id, articulo, cantidad, precio, descuento});
    await ventas.save();

    res.json({
      ventas,
    });
  },

  ventasById: async (req, res) => {
    const { id } = req.params;
    const ventas = await Ventas.findById(id);

    res.json({
      ventas,
    });
  },

  ventasPut: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, estado, ...resto } = req.body
    const ventas = await Ventas.findByIdAndUpdate(id, resto);

    res.json({
      ventas,
    });
  },

  ventasActivar: async (req, res) => {
    const { id } = req.params;
    const ventas = await Ventas.findOneAndUpdate(id, { estado: 1 });

    res.json({
      ventas,
    });
  },

  ventasDesactivar: async (req, res) => {
    const { id } = req.params;
    const ventas = await Ventas.findOneAndUpdate(id, { estado: 0 });

    res.json({
      ventas,
    });
  },

  ventasDelete: async (req, res) => {
    const { id } = req.params;
    const ventas = await Ventas.findByIdAndDelete(id);

    res.json({
      ventas,
    });
  },
};

export default ventas;
