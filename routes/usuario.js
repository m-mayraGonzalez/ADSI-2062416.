import  Router from "express"
import usuario from "../controllers/usuario.js";
import { existeUsuarioById, existeUsuarioByNombre } from "../db-helpers/usuario.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import validator from 'express-validator';
const {check} = validator

const router = Router();

router.get("/",[
    validarCampos
],usuario.usuarioGet);

router.get("/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuario.usuarioById);

router.post("/",[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeUsuarioByNombre),
    validarCampos
],usuario.usuarioPost);

router.post("/login",usuario.login)

router.put("/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('nombre').custom(existeUsuarioByNombre),
    validarCampos
],usuario.usuarioPut);

router.put("/activar/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuario.usuarioActivar);

router.put("/desactivar/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuario.usuarioDesactivar);

router.delete("/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuario.usuarioDelete);

export default router


