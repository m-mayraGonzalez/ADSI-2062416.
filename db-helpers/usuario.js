import Usuario from "../models/usuario.js";

const existeUsuarioById = async (id) => {
  const existe = await Usuario.findById(id);

  if (!existe) throw new Error(`No existe usuario para este ID ${id}`);
};
const existeUsuarioByNombre = async (nombre) => {
  const existe = await Usuario.findOne({ nombre });

  if (existe) throw Error("Ya existe una usuario con ese nombre");
};
export { existeUsuarioById, existeUsuarioByNombre };