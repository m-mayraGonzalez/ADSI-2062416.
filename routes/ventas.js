import  Router from "express"
import ventas from "../controllers/ventas.js";
import { existeVentasById, existeVentasByNombre } from "../db-helpers/ventas.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import validator from 'express-validator';
const {check} = validator

const router = Router();

router.get("/",[
    validarJWT,
    validarCampos
],ventas.ventasGet);

router.get("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentasById),
    validarCampos
],ventas.ventasById);

router.post("/",[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeVentasByNombre),
    validarCampos
],ventas.ventasPost);

router.put("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentasById),
    check('nombre').custom(existeVentasByNombre),
    validarCampos
],ventas.ventasPut);

router.put("/activar/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentasById),
    validarCampos
],ventas.ventasActivar);

router.put("/desactivar/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentasById),
    validarCampos
],ventas.ventasDesactivar);

router.delete("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentasById),
    validarCampos
],ventas.ventasDelete);

export default router