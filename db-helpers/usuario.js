import Usuario from "../models/usuario.js";

const existeUsuarioById = async (id) => {
  const existe = await Usuario.findById(id);

  if (!existe) throw new Error(`No existe usuario para este ID ${id}`);
};
const existeUsuarioEmail = async (email) => {
  const existe = await Usuario.findOne({ email });

  if (! existe) throw new Error("El email ya se encuentra en uso");
};
export { existeUsuarioById, existeUsuarioEmail };