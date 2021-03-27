import Compras from "../models/compras.js";

const existeComprasById = async (id) => {
  const existe = await Compras.findById(id);

  if (!existe) throw new Error(`No existe compras para este ID ${id}`);
};

export { existeComprasById };