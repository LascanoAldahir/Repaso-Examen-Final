import { Router } from 'express';
import {
    login,
    perfil,
    listarUsuarios,
    actualizarPerfil,
    detalleUsuario
} from "../controllers/usuario_controller.js";

const router = Router();

router.post("/login", login);
router.get("/usuarios", listarUsuarios);
router.get('/perfil', perfil);
router.get('/usuario/:id', detalleUsuario);
router.put('/usuario/:id', actualizarPerfil);

export default router;
