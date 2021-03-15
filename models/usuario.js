import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
  nombre: { type: String, required: true, maxlength: 50, unique: true },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 100,
    //gender: { type: Number, maxlength: 1 },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    //hide: true,
  },
  rol: { type: String, required: true, maxlength: 20 },
  estado: { type: Number, default: 1 }, //estado:1 activo estado:0 como inactivo
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("usuario", usuarioSchema);
