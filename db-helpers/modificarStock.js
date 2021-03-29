import Articulos from "../models/articulos.js"; 

const stock = {
    disminuirStock: async (_id, cantidad)=>{
        let {stock}= await Articulos.findById(_id);
        stock=parseInt(stock)-parseInt(cantidad);
        await Articulos.findByIdAndUpdate ({_id}, {stock}); 
    },
    aumentarStock : async (_id, cantidad)=>{
        let {stock}= await Articulos.findById(_id);
        stock = parseInt(stock) + parseInt(cantidad);
        await Articulos.findByIdAndUpdate ({_id}, {stock}); 
    }
}; 

export default stock