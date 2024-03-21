import {Router} from 'express'
import {
    actualizarModulo2,
    detalleModulo2,
    eliminarModulo2,
    listarModulo2,
    loginModulo2,
    perfilModulo2 
} from "../controllers/modulo2_controller.js";

const router = Router()

router.post('/modulo2/login',loginModulo2)
router.get('/modulo2/perfil',perfilModulo2)
router.get('/modulo2',listarModulo2)
router.get('/modulo2/:id',detalleModulo2)
router.put('/modulo2/actualizar/:id',actualizarModulo2)
router.delete('/modulo2/eliminar/:id',eliminarModulo2)

export default router