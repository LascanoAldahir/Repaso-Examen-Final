import {Router} from 'express'
const router = Router()

import {
    login,
    perfil,
    registro,
    confirmEmail,
    listarUsuarios,
    actualizarPerfil,
    actualizarPassword,
    recuperarPassword,
    comprobarTokenPasword,
    nuevoPassword,
    detalleUsuario,
} from "../controllers/usuario_controller.js";

router.post("/login", login);
router.post("/registro", registro);
router.get("/confirmar/:token", confirmEmail);
router.get("/usuarios", listarUsuarios);
router.get("/recuperar-password", recuperarPassword);
router.get("/recuperar-password/:token", comprobarTokenPasword);
router.post("/nuevo-password/:token", nuevoPassword);

router.get("/perfil", perfil);
router.put('/usuario/actualizarpassword',actualizarPassword)
router.get("/usuario/:id", detalleUsuario);
router.put("/usuario/:id", actualizarPerfil);


router.post('/login',(req,res)=>res.send("login"))
router.post('/registro',(req,res)=>res.send("registro"))
router.get('/confirmar/:token',(req,res)=>res.send("confirmar email"))
router.get('/usuarios',(req,res)=>res.send("lista de usuarios"))
router.get('/recuperar-password',(req,res)=>res.send("enviar mail"))
router.get('/recuperar-password/:token',(req,res)=>res.send("verificar token"))
router.post('/nuevo-password/:token',(req,res)=>res.send("crear password"))

router.get('/perfil',(req,res)=>res.send("perfil"))
router.put('/usuario/actualizarpassword',(req,res)=>res.send("actualizar password"))
router.get('/usuario/:id',(req,res)=>res.send("detalle del usuario"))
router.put('/usuario/:id',(req,res)=>res.send("actualizar perfil"))

export default router