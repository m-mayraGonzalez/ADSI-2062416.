import mongoose from "mongoose";

const comprasSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.ObjectId, ref: "usuario", required: true },
  persona: {
    type: mongoose.Schema.ObjectId,
    ref: "persona",
    required: true,
  },
  tipoComprobante: { type: String, required: true, maxlength: 20 },
  serieComprobante: { type: String, maxlength: 10 },
  numComprobante: { type: String, maxlength: 10, required: true },
  impuesto: { type: Number, required: true },
  total: { type: Number, required: true },
  detalles: [
    {
      _id: { type: String, required: true },
      articulo: { type: String, required: true },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true },
    },
  ],
  state: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("compras", comprasSchema);