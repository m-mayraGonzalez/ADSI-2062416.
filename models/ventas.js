import mongoose from "mongoose"; 

const ventasSchema = mongoose.Schema({
  usuario: {type:mongoose.Schema.ObjectId,ref:'usuario',required:true}, 
  persona: {type:mongoose.Schema.ObjectId,ref:'persona',required:true},
  tipoComprobante: {type: String, required: true, maxlength: 50}, 
  serieComprobante: {type: String}, 
  numComprobante: {type: Number, required: true, maxlength: 50}, 
  impuesto: {type: String, required: true}, 
  total: {type: Number, require: true, unique: true}, 
  detalles:[{
    _id: {type:String},
    articulo: {type:String,required:true}, 
    cantidad: {type:Number,default:1},
    precio: {type:Number}, 
    descuento: {Type:Number,default:0}
  }], 
  estado: { type: Number, default: 1 }, //estado:1 activo estado:0 como inactivo
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("ventas", ventasSchema); 