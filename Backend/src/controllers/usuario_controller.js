import Usuario from "../models/Usuario.js"
import mongoose from "mongoose";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Verificar que se hayan proporcionado correo electrónico y contraseña
        if (!email || !password) {
            return res.status(400).json({ msg: "Debes proporcionar un correo electrónico y una contraseña" });
        }

        // Buscar al usuario por su correo electrónico
        const usuarioBDD = await Usuario.findOne({ email });

        // Verificar si el usuario existe en la base de datos
        if (!usuarioBDD) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Verificar si la contraseña es correcta
        const verificarPassword = await usuarioBDD.matchPassword(password);
        if (!verificarPassword) {
            return res.status(401).json({ msg: "Contraseña incorrecta" });
        }

        // Si llegamos hasta aquí, el usuario ha ingresado credenciales válidas
        // Devolver los datos del usuario como respuesta
        const { nombre, apellido, direccion, telefono, _id } = usuarioBDD;
        res.status(200).json({
            msg: "Inicio de sesión exitoso",
            nombre,
            apellido,
            direccion,
            telefono,
            _id,
            email
        });
    } catch (error) {
        console.error("Error en la función de login:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

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