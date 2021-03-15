import Router from "express";
import usuario from "../controllers/usuario.js";

const router = Router();

router.get("/", usuario.usuarioGet);

router.get("/:id", usuario.usuarioById);

router.post("/", usuario.usuarioPost);

router.post('/login', usuario.login)

router.put("/:id", usuario.usuarioPut);

router.put("/activar/:id", usuario.usuarioActivar);

router.put("/desactivar/:id", usuario.usuarioDesactivar);

router.delete("/:id", usuario.usuarioDelete);

export default router;


