import {Router} from 'express'
const router = Router()


router.post('/modulo2/login',(req,res)=>res.send("Login del paciente"))
router.get('/modulo2/perfil',(req,res)=>res.send("Perfil del paciente"))
router.get('/modulo2',(req,res)=>res.send("Listar pacientes"))
router.get('/modulo2/:id',(req,res)=>res.send("Detalle del paciente"))
router.post('/modulo2/registro',(req,res)=>res.send("Registrar paciente"))
router.put('/modulo2/actualizar/:id',(req,res)=>res.send("Actualizar paciente"))
router.delete('/modulo2/eliminar/:id',(req,res)=>res.send("Eliminar paciente"))

export default router