import {Router} from 'express'
import {
    actualizarModulo2,
    detalleModulo2,
    eliminarModulo2,
    listarModulo2,
    registrarModulo2,
    loginModulo2,
    perfilModulo2 
} from "../controllers/modulo2_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = Router()

router.post('/modulo2/login',loginModulo2)
router.get('/modulo2/perfil',verificarAutenticacion,perfilModulo2)
router.get('/modulo2',verificarAutenticacion,listarModulo2)
router.get('/modulo2/:id',verificarAutenticacion,detalleModulo2)
router.post('/modulo2/registro',verificarAutenticacion,registrarModulo2)
router.put('/modulo2/actualizar/:id',verificarAutenticacion,actualizarModulo2)
router.delete('/modulo2/eliminar/:id',verificarAutenticacion,eliminarModulo2)

export default router