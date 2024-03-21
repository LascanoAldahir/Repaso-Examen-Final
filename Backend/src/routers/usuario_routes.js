import {Router} from 'express'
const router = Router()

import {
    login,
    perfil,
    listarUsuarios,
    actualizarPerfil,
    detalleUsuario
} from "../controllers/usuario_controller.js";


router.post("/login", login);
router.get("/usuarios", listarUsuarios);
router.get('/perfil',perfil)
router.get('/usuario/:id',detalleUsuario)
router.put('/usuario/:id',actualizarPerfil)

router.post('/login',(req,res)=>res.send("login"))
router.get('/usuarios',(req,res)=>res.send("lista de usuarios"))
router.get('/perfil',(req,res)=>res.send("perfil"))
router.get('/usuario/:id',(req,res)=>res.send("detalle del usuario"))
router.put('/usuario/:id',(req,res)=>res.send("actualizar perfil"))

export default router