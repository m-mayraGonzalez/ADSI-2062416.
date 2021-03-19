import Compras from "../models/compras.js";

const existeComprasById = async (id) => {
  const existe = await Compras.findById(id);

  if (!existe) throw new Error(`No existe compras para este ID ${id}`);
};
const existeComprasByNombre = async (nombre) => {
  const existe = await Compras.findOne({ nombre });

  if (existe) throw Error("Ya existe una compra con ese nombre");
};
export { existeComprasById, existeComprasByNombre };