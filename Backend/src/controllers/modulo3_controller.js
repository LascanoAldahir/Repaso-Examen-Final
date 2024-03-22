import Modulo3 from "../models/Modulo3.js"
import mongoose from "mongoose";


const detalleModulo3 = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe ese tratamiento`});
    const modulo3 = await Modulo3.findById(id).populate('paciente','_id nombre')
    res.status(200).json(modulo3)
}
const registrarModulo3 = async (req,res)=>{
    const {modulo2} = req.body
    if( !mongoose.Types.ObjectId.isValid(modulo2) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    const modulo3 = await Mpdulo3.create(req.body)
    res.status(200).json({msg:`Registro exitoso del tratamiento ${modulo3._id}`,modulo3})
}
const actualizarModulo3 = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el tratamiento ${id}`})
    await Modulo3.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa del tratamiento"})
}
const eliminarModulo3 = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe ese tratamiento`})
    await Modulo3.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Tratamiento eliminado exitosamente"})
}

const cambiarEstado = async(req,res)=>{
    await Modulo3.findByIdAndUpdate(req.params.id,{estado:false})
    res.status(200).json({msg:"Estado del Tratamiento modificado exitosamente"})
}

export {
    detalleModulo3,
    registrarModulo3,
    actualizarModulo3,
    eliminarModulo3,
    cambiarEstado
}