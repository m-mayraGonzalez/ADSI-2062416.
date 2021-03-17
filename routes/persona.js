import  Router from "express"
import persona from "../controllers/persona.js";
import { existePersonaById, existePersonaByNombre } from "../db-helpers/persona.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarPJWT } from "../middlewares/validar-jwt.js";
import validator from 'express-validator';
const {check} = validator

const router = Router();

router.get("/",[
    validarPJWT,
    validarCampos
],persona.personaGet);

router.get("/:id",[
    validarPJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],persona.personaById);

router.post("/",[
    validarPJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existePersonaByNombre),
    validarCampos
],persona.personaPost);

router.put("/:id",[
    validarPJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    check('nombre').custom(existePersonaByNombre),
    validarCampos
],persona.personaPut);

router.put("/activar/:id",[
    validarPJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],persona.personaActivar);

router.put("/desactivar/:id",[
    validarPJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],persona.personaDesactivar);

router.delete("/:id",[
    validarPJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],persona.personaDelete);

export default router

