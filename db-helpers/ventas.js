import Ventas from "../models/ventas.js";

const existeVentasById = async (id) => {
  const existe = await Ventas.findById(id);

  if (!existe) throw new Error(`No existe una ventas para este ID ${id}`);
};
export { existeVentasById };