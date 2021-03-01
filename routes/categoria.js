import Router from "express";
import categoria from "../controllers/categoria.js";

const router = Router();

router.get("/", categoria.categoriaGet);

router.get("/:id", categoria.categoriaById);

router.post("/", categoria.categoriaPost);

router.put("/:id");

router.put("/activar/:id");

router.put("/desactivar/:id");

router.delete("/:id");

export default router;
