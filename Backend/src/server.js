// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerUsuarios from './routers/usuario_routes.js'
import routerModulo2 from './routers/modulo2_routes.js'
import routerModulo3 from './routers/modulo3_routes.js'

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('PORT',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Variables globales

// Rutas 
app.use('/api',routerUsuarios)
app.use('/api',routerModulo2)
app.use('/api',routerModulo3)
// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

app.get('/',(req,res)=>{
    res.send("Server on")
})

// Exportar la instancia de express por medio de app
export default  app