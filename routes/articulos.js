import  Router from "express"
import articulos from "../controllers/articulos.js";
import { existeArticulosById, existeArticulosByNombre } from "../db-helpers/articulos.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarAJWT } from "../middlewares/validar-jwt.js";
import validator from 'express-validator';
const {check} = validator

const router = Router();

router.get("/",[
    validarAJWT,
    validarCampos
],articulos.articulosGet);

router.get("/:id",[
    validarAJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticulosById),
    validarCampos
],articulos.articulosById);

router.post("/",[
    validarAJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeArticulosByNombre),
    validarCampos
],articulos.articulosPost);

router.put("/:id",[
    validarAJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticulosById),
    check('nombre').custom(existeArticulosByNombre),
    validarCampos
],articulos.articulosPut);

router.put("/activar/:id",[
    validarAJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticulosById),
    validarCampos
],articulos.articulosActivar);

router.put("/desactivar/:id",[
    validarAJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticulosById),
    validarCampos
],articulos.articulosDesactivar);

router.delete("/:id",[
    validarAJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticulosById),
    validarCampos
],articulos.articulosDelete);

export default router