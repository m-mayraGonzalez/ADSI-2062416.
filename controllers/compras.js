import Compras from "../models/ventas.js"; 
import modificarStock from "../models/compras.js"

const compras = {
    comprasGet: async (req, res) => {
    const {value} = req.query;
    const compras = await Compras
    .find({
      $or: [
        { tipoComprobante: new RegExp(value, "i") },
        { numComprobante: new RegExp(value, "i") },
        { detalle: new RegExp(value, "i") },
      ],
    })
    .populate('usuario', 'persona', 'tipoComprobante', 'numComprobante', 'detalle')
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

  agregar: async (req, res) => {
    const {
      usuario,
      persona,
      tipoComprobante,
      serieComprobante,
      numComprobante,
      total,
      impuestos,
      detalle,
    } = req.body;
    const compras = new Compras({
      usuario,
      persona,
      tipoComprobante,
      serieComprobante,
      numComprobante,
      total,
      impuestos,
      detalle,
    });

    compras.total = compras.detalle.reduce((acc, articulos) => acc + (articulos.cantidad * articulos.precio), 0)
  
    compras.impuestos = compras.total * 0.19
    await compras.save();
    detalle.map((articulos) => modificarStock.disminuirStock(articulos._id,articulos.cantidad))
    res.status(200).json({
      compras,
    });
  },
  comprasActivar: async (req, res) => {
    const { id } = req.params;
    const compras = await Compras.findByIdAndUpdate(id, { state: 1 });
    compras.detalle.map((articulos) => modificarStock.disminuirStock(articulos._id,articulos.cantidad))
    res.json({
      compras,
    });
  },
  comprasDesactivar: async (req, res) => {
    const { id } = req.params;
    const compras = await Compras.findByIdAndUpdate(id, { state: 0 });
    compras.detalle.map((articulos) => modificarStock.aumentarStock(articulos._id,articulos.cantidad))
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