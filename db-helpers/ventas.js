import Ventas from "../models/ventas.js";

const existeVentasById = async (id) => {
  const existe = await Ventas.findById(id);

  if (!existe) throw new Error(`No existe ventas para este ID ${id}`);
};
const existeVentasByNombre = async (nombre) => {
  const existe = await Ventas.findOne({ nombre });

  if (existe) throw Error("Ya existe una venta con ese nombre");
};
export { existeVentasById, existeVentasByNombre };