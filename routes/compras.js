import  Router from "express"
import compras from "../controllers/compras.js";
import { existeComprasById } from "../db-helpers/compras.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import validator from 'express-validator';
const {check} = validator

const router = Router();

router.get("/",[
    validarJWT,
    validarCampos
],compras.comprasGet);

router.get("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeComprasById),
    validarCampos
],compras.comprasById);

router.post("/",[
    validarJWT,
    //check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],compras.agregar);

router.put("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeComprasById),
    validarCampos
],compras.comprasPut);

router.put("/activar/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeComprasById),
    validarCampos
],compras.comprasActivar);

router.put("/desactivar/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeComprasById),
    validarCampos
],compras.comprasDesactivar);

router.delete("/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeComprasById),
    validarCampos
],compras.comprasDelete);

export default router