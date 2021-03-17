import mongoose from "mongoose";

const articulosSchema = mongoose.Schema({
  categoria: {}, 
  nombre: { type: String, required: true, maxlength: 50, unique: true },
  codigo: {type: String, Number, required: true},
  descripcion: { type: String, maxlength: 150 },
  precioVenta: {type:Number},
  stock: {type: String, Number},
  estado: { type: Number, default: 1 }, //estado:1 activo estado:0 como inactivo
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("articulos", articulosSchema);