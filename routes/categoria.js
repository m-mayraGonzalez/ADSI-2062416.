import  Router from "express"
import categoria from "../controllers/categoria.js";
import { existeCategoriaById, existeCategoriaByNombre } from "../db-helpers/categoria.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarCJWT } from "../middlewares/validar-jwt.js";
import validator from 'express-validator';
const {check} = validator

const router = Router();

router.get("/",[
    validarCJWT,
    validarCampos
],categoria.categoriaGet);

router.get("/:id",[
    validarCJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],categoria.categoriaById);

router.post("/",[
    validarCJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
],categoria.categoriaPost);

router.put("/:id",[
    validarCJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
],categoria.categoriaPut);

router.put("/activar/:id",[
    validarCJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],categoria.categoriaActivar);

router.put("/desactivar/:id",[
    validarCJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],categoria.categoriaDesactivar);

router.delete("/:id",[
    validarCJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],categoria.categoriaDelete);

export default router
