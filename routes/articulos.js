import  Router from "express"
import articulos from "../controllers/articulos.js";
import { existeArticulosById, existeArticulosByNombre, existeArticulosByCodigo } from "../db-helpers/articulos.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import validator from 'express-validator';
const {check} = validator

const router = Router();

router.get("/",[
    validarJWT,
    validarCampos
],articulos.articulosGet);

router.get("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticulosById),
    validarCampos
],articulos.articulosById);

router.post("/",[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeArticulosByNombre),
    check('codigo').custom(existeArticulosByCodigo),
    validarCampos
],articulos.articulosPost);

router.put("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticulosById),
    check('nombre').custom(existeArticulosByNombre),
    check('codigo').custom(existeArticulosByCodigo),
    validarCampos
],articulos.articulosPut);

router.put("/activar/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticulosById),
    validarCampos
],articulos.articulosActivar);

router.put("/desactivar/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticulosById),
    validarCampos
],articulos.articulosDesactivar);

router.delete("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticulosById),
    validarCampos
],articulos.articulosDelete);

export default router