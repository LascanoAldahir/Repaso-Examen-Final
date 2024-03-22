import {Router} from 'express'
import {
    detalleModulo3,
    registrarModulo3,
    actualizarModulo3,
    eliminarModulo3,
    cambiarEstado
} from "../controllers/modulo3_controller.js";

const router = Router()

router.post('/modulo3/registro',registrarModulo3)
router
    .route('/modulo3/:id')
    .get(detalleModulo3)
    .put(actualizarModulo3)
    .delete(eliminarModulo3)

router.put('/tratamiento/estado/:id',cambiarEstado)

export default router