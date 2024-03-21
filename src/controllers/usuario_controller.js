import Usuario from "../models/Usuario.js"
import { sendMailToUser, sendMailToRecoveryPassword } from "../config/nodemailer.js"
import generarJWT from "../helpers/crearJWT.js"
import mongoose from "mongoose";

const login = async(req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuario.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    if(usuarioBDD?.confirmEmail===false) return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    if(!usuarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const verificarPassword = await usuarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    
    const token = generarJWT(usuarioBDD._id,"usuario")    
    const {nombre,apellido,direccion,telefono,_id} = usuarioBDD
    res.status(200).json({
        token,
        nombre,
        apellido,
        direccion,
        telefono,
        _id,
        email:usuarioBDD.email
    })
}
const perfil =(req,res)=>{
    delete req.usuarioBDD.token
    delete req.usuarioBDD.confirmEmail
    delete req.usuarioBDD.createdAt
    delete req.usuarioBDD.updatedAt
    delete req.usuarioBDD.__v
    res.status(200).json(req.usuarioBDD)
}

const listarUsuarios = (req,res)=>{
    res.status(200).json({res:'lista de veterinarios registrados'})
}
const detalleUsuario = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    const usuarioBDD = await Usuario.findById(id).select("-password")
    if(!usuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`})
    res.status(200).json({msg:usuarioBDD})
}

const actualizarPerfil = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuario.findById(id)
    if(!usuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`})
    if (usuarioBDD.email !=  req.body.email)
    {
        const usuarioBDDMail = await Veterinario.findOne({email:req.body.email})
        if (usuarioBDDMail)
        {
            return res.status(404).json({msg:`Lo sentimos, el existe ya se encuentra registrado`})  
        }
    }
		usuarioBDD.nombre = req.body.nombre || usuarioBDD?.nombre
        usuarioBDD.apellido = req.body.apellido  || usuarioBDD?.apellido
        usuarioBDD.direccion = req.body.direccion ||  usuarioBDD?.direccion
        usuarioBDD.telefono = req.body.telefono || usuarioBDD?.telefono
        usuarioBDD.email = req.body.email || usuarioBDD?.email
        await usuarioBDD.save()
        res.status(200).json({msg:"Perfil actualizado correctamente"})
    }
    

export {
    login,
    perfil,
    listarUsuarios,
    detalleUsuario,
    actualizarPerfil
}