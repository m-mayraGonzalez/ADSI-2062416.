import Articulos from "../models/articulos.js";

const existeArticulosById = async (id) => {
  const existe = await Articulos.findById(id);

  if (!existe) throw new Error(`No existe aticulo para este ID ${id}`);
};
const existeArticulosByNombre = async (nombre) => {
  const existe = await Articulos.findOne({ nombre });

  if (existe) throw Error("Ya existe un articulo con ese nombre");
};
export { existeArticulosById, existeArticulosByNombre };