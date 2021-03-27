import mongoose from "mongoose";

const ventasSchema = mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  persona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "personas",
    required: true,
  },
  tipoComprobante: { type: String, required: true, maxlength: 50 },
  serieComprobante: { type: String },
  numComprobante: { type: Number, required: true, maxlength: 50 },
  impuesto: { type: Number, required: true },
  total: { type: Number, required: true },
  detalles: [
    {
      _id: { type: String },
      articulo: { type: String, required: true },
      cantidad: { type: Number, required: true },
      precio: { type: Number, required: true },
      descuento: { Type: Number, default: 0 },
    },
  ],
  estado: { type: Number, default: 1 }, //estado:1 activo estado:0 como inactivo
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ventas", ventasSchema);
