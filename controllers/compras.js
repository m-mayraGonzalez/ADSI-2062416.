import Compras from "../models/compras.js";
import modificarStock from "../db-helpers/modificarStock.js"

const compras = {
  comprasGet: async (req, res) => {
    const { value } = req.query;
    const compras = await Compras
      .find({
        $or: [
          { tipoComprobante: new RegExp(value, "i") },
          { numComprobante: new RegExp(value, "i") },
        ],
      })
      .sort({ createdAt: -1 })
      .populate('usuario', ['nombre', 'email'])
      .populate('persona', ['nombre', 'tipoDocumento'])

    res.json({
      compras,
    });
  },

  comprasById: async (req, res) => {
    const { id } = req.params;
    const compras = await Compras
      .findOne({ _id: id })
      .populate("usuarios", ["nombre", "email"])
      .populate("personas ", ["nombre", "tipoDocumento"]);

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
      impuesto,
      detalles,
    } = req.body;
    const compras = new Compras({
      usuario,
      persona,
      tipoComprobante,
      serieComprobante,
      numComprobante,
      total,
      impuesto,
      detalles,
    });

    compras.total = compras.detalles.reduce((acc, articulos) => acc + (articulos.cantidad * articulos.precio), 0)

    compras.impuesto = compras.total * 0.19
    await compras.save();
    detalles.map((articulos) => modificarStock.disminuirStock(articulos._id, articulos.cantidad))
    res.json({
      compras,
    });
  },
  comprasActivar: async (req, res) => {
    const { id } = req.params;
    const compras = await Compras.findByIdAndUpdate(id, { state: 1 });
    compras.detalles.map((articulos) => modificarStock.disminuirStock(articulos._id, articulos.cantidad))
    res.json({
      compras,
    });
  },
  comprasDesactivar: async (req, res) => {
    const { id } = req.params;
    const compras = await Compras.findByIdAndUpdate(id, { state: 0 });
    compras.detalles.map((articulos) => modificarStock.aumentarStock(articulos._id, articulos.cantidad))
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