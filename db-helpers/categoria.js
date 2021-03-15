import Categoria from "../models/categoria.js";

const existeCategoriaById = async (id) => {
  const existe = await Categoria.findById(id);

  if (!existe) throw new Error(`No existe categoria para este ID ${id}`);
};
const existeCategoriaByNombre = async (nombre) => {
  const existe = await Categoria.findOne({ nombre });

  if (existe) throw Error("Ya existe una categoria con ese nombre");
};
export { existeCategoriaById, existeCategoriaByNombre };
