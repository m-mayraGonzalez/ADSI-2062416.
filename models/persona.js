import mongoose from "mongoose"; 

const personaSchema = new mongoose.Schema({
    tipoPersona: {type: String},
    nombre: {type: String, required: true, maxlength: 50, unique: true},
    tipoDocumento: {type: String, required: true, maxlength: 50},
    numDocumento: {type:Number, required: true, maxlength: 10},
    direccion: {type: String, Number, requiered: true},
    telefono: {tipe: Number, required: false},
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 100,
        //gender: { type: Number, maxlength: 1 },
    },
    estado: { type: Number, default: 1 }, //estado:1 activo estado:0 como inactivo
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("persona", personaSchema); 