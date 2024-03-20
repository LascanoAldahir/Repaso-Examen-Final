import { sendMailToModulo2 } from "../config/nodemailer.js"
import Modulo2 from "../models/Modulo2.js"
import mongoose from "mongoose"

const loginModulo2 =  async(req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const modulo2BDD = await Modulo2.findOne({email})
    if(!modulo2BDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const verificarPassword = await modulo2BDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    const token = generarJWT(modulo2BDDBDD._id,"modulo2")
	const {nombre,propietario,email:emailP,celular,convencional,_id} = modulo2BDD
    res.status(200).json({
        token,
        nombre,
        propietario,
        emailP,
        celular,
        convencional,
        _id
    })
}
const perfilModulo2 = (req,res)=>{
    delete req.modulo2BDD.ingreso
    delete req.modulo2BDD.sintomas
    delete req.modulo2BDD.salida
    delete req.modulo2BDD.estado
    delete req.modulo2BDD.veterinario
    delete req.modulo2BDD.createdAt
    delete req.modulo2BDD.updatedAt
    delete req.modulo2BDD.__v
    res.status(200).json(req.modulo2BDD)
}
const listarModulo2 = async (req,res)=>{
    const modulos = await Modulo2.find({estado:true}).where('veterinario').equals(req.moduloBDD).select("-salida -createdAt -updatedAt -__v").populate('veterinario','_id nombre apellido')
    res.status(200).json(modulos)
}
const detalleModulo2 = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`});
    const modulo2 = await Modulo2.findById(id).select("-createdAt -updatedAt -__v").populate('veterinario','_id nombre apellido')
    res.status(200).json(modulo2)
}
const registrarModulo2 = async(req,res)=>{
    const {email} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarEmailBDD = await Modulo2.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const nuevoModulo2 = new Modulo2(req.body)
    const password = Math.random().toString(36).slice(2)
    nuevoModulo2.password = await nuevoModulo2.encrypPassword("vet"+password)
    await sendMailToModulo2(email,"vet"+password)
    nuevoModulo2.usuario=req.usuarioBDD._id
    await nuevoModulo2.save()
    res.status(200).json({msg:"Registro exitoso del modulo2 y correo enviado"})
}
const actualizarModulo2 = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`});
    await Modulo2.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa del paciente"})
}
const eliminarModulo2 = async (req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`})
    const {salida} = req.body
    await Modulo2.findByIdAndUpdate(req.params.id,{salida:Date.parse(salida),estado:false})
    res.status(200).json({msg:"Fecha de salida del paciente registrado exitosamente"})
}

export {
		loginModulo2,
		perfilModulo2, 
        listarModulo2,
        detalleModulo2,
        registrarModulo2,
        actualizarModulo2,
        eliminarModulo2
    }