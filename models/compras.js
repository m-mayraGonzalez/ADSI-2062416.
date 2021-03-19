import mongoose from "mongoose"; 

const comprasSchema = mongoose.Schema({
  usuario: {type:mongoose.Schema.Types.ObjectId,ref:'usuario',required:true}, 
  persona: {type:mongoose.Schema.Types.ObjectId,ref:'persona',required:true},
  tipoComprobante: {type: String, required: true, maxlength: 50}, 
  serieComprobante: {type: String}, 
  numComprobante: {type: Number, required: true, maxlength: 50}, 
  impuesto: {type: String, required: true}, 
  total: {type: Number, require: true, unique: true}, 
  detalles:[{
    _id: {type:String},
    articulo: {type:String,required:true}, 
    cantidad: {type:Number,default:1},
    precio: {type:Number}
  }], 
  estado: { type: Number, default: 1 }, //estado:1 activo estado:0 como inactivo
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("compras", comprasSchema); 