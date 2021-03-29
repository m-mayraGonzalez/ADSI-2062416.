import Ventas from "../models/ventas.js"; 
import modificarStock from "../db-helpers/modificarStock.js"

const ventas = {
  ventasGet: async (req, res) => {
    const { value } = req.query;
    const ventas = await Ventas
    .find({
      $or: [
        { tipoComprobante: new RegExp(value, "i") },
        { numComprobante: new RegExp(value, "i") },
      ],
    })
    .sort({ createdAt: -1 })
    .populate('usuarios', ['nombre', 'email'])
    .populate('personas', ['nombre', 'tipoDocumento'])
    
    res.json({
      ventas,
    });
  },

  ventasById: async (req, res) => {
    const { id } = req.params;
    const ventas = await Ventas
      .findOne({ _id: id })
      .populate("usuarios", ["nombre", "email"])
      .populate("personas ", ["nombre", "tipoDocumento"]);

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

  agregar: async (req, res) => {
    const {
      usuario,
      persona,
      tipoComprobante,
      serieComprobante,
      numComprobante,
      impuesto,
      total,
      detalles,
    } = req.body;
    const ventas = new Ventas({
      usuario,
      persona,
      tipoComprobante,
      serieComprobante,
      numComprobante,
      impuesto,
      total,
      detalles,
    });
    ventas.total = ventas.detalles.reduce((acc, articulos) => acc + ((articulos.cantidad * articulos.precio) -
    articulos.descuento), 0)

    ventas.impuesto = ventas.total * 0.19

    await ventas.save();
    detalles.map((articulos) => modificarStock.disminuirStock(articulos._id, articulos.cantidad))
    res.json({
      ventas,
    });
  },

  ventasActivar: async (req, res) => {
    const { id } = req.params;
    const ventas = await Ventas.findByIdAndUpdate(id, { state: 1 });
    ventas.detalles.map((articulos) => modificarStock.disminuirStock(articulos._id,articulos.cantidad))
    res.json({
      ventas,
    });
  },
  ventasDesactivar: async (req, res) => {
    const { id } = req.params;
    const ventas = await Ventas.findByIdAndUpdate(id, { state: 0 });
    ventas.detalles.map((articulos) => modificarStock.aumentarStock(articulos._id,articulos.cantidad))
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
