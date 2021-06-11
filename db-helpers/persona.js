import Persona from "../models/persona.js";

const existePersonaById = async (id,req) => {
  const existe = await Persona.findById(id);

  if (!existe) throw new Error(`No existe persona para este ID ${id}`);

  req.req.Persona=existe
};

const existePersonaByNombre = async (nombre, req) => {
  const method = req.req.method;
  const existe = await Persona.findOne({ nombre });

  if (method == "PUT") {
    if(existe && existe._id.toString() !== req.req.Persona._id.toString())
      throw Error("Ya existe una persona con ese nombre");
    else if (existe) Error("Ya existe una persona con ese nombre");
  }
    
  // if (method=='PUT' && )  

};
export { existePersonaById, existePersonaByNombre };
