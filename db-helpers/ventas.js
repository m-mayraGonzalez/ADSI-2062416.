import Ventas from "../models/ventas.js";

const existeVentasById = async (id) => {
  const existe = await Ventas.findById(id);

  if (!existe) throw new Error(`No existe una venta para este ID`);
};
export { existeVentasById };