import  Router from "express"
import persona from "../controllers/persona.js";
import { existePersonaById, existePersonaByNombre } from "../db-helpers/persona.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import validator from 'express-validator';
const {check} = validator

const router = Router();

router.get("/",[
    validarJWT,
    validarCampos
],persona.personaGet);

router.get("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],persona.personaById);

router.post("/",[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existePersonaByNombre),
    validarCampos
],persona.personaPost);

router.put("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    check('nombre').custom(existePersonaByNombre),
    validarCampos
],persona.personaPut);

router.put("/activar/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],persona.personaActivar);

router.put("/desactivar/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],persona.personaDesactivar);

router.delete("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],persona.personaDelete);

export default router

