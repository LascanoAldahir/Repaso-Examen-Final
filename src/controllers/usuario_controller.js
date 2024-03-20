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
    delete req.veterinarioBDD.token
    delete req.veterinarioBDD.confirmEmail
    delete req.veterinarioBDD.createdAt
    delete req.veterinarioBDD.updatedAt
    delete req.veterinarioBDD.__v
    res.status(200).json(req.veterinarioBDD)
}
const registro = async (req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarEmailBDD = await Usuario.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const nuevoUsuario = new Usuario(req.body)
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password)

    const token = nuevoUsuario.crearToken()
    await sendMailToUser(email,token)
    await nuevoUsuario.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})

}
const confirmEmail = async (req,res)=>{
    if(!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    const usuarioBDD = await Usuario.findOne({token:req.params.token})
    if(!usuarioBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
    usuarioBDD.token = null
    usuarioBDD.confirmEmail=true
    await usuarioBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 
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
const recuperarPassword = async(req,res)=>{
    const {email} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuario.findOne({email})
    if(!usuarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const token = usuarioBDD.crearToken()
    usuarioBDD.token=token
    await sendMailToRecoveryPassword(email,token)
    await usuarioBDD.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para reestablecer tu cuenta"})
}
const comprobarTokenPasword = async (req,res)=>{
    if(!(req.params.token)) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    const usuarioBDD = await Usuario.findOne({token:req.params.token})
    if(usuarioBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    await usuarioBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"}) 
}
const actualizarPassword = async (req,res)=>{
    const usuarioBDD = await Veterinario.findById(req.veterinarioBDD._id)
    if(!usuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`})
    const verificarPassword = await usuarioBDD.matchPassword(req.body.passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})
    usuarioBDD.password = await usuarioBDD.encrypPassword(req.body.passwordnuevo)
    await usuarioBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
}
const nuevoPassword = async (req,res)=>{
    const{password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if(password != confirmpassword) return res.status(404).json({msg:"Lo sentimos, los passwords no coinciden"})
    const usuarioBDD = await Usuario.findOne({token:req.params.token})
    if(usuarioBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    usuarioBDD.token = null
    usuarioBDD.password = await usuarioBDD.encrypPassword(password)
    await usuarioBDD.save()
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 
}

export {
    login,
    perfil,
    registro,
    confirmEmail,
    listarUsuarios,
    detalleUsuario,
    actualizarPerfil,
    actualizarPassword,
	recuperarPassword,
    comprobarTokenPasword,
	nuevoPassword
}