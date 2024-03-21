import {Schema, model} from 'mongoose';

const usuarioSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    }
    
},{
    timestamps:true
})

// Método para verificar si el password ingresado es el mismo de la BDD
usuarioSchema.methods.matchPassword = function (password) {
    return this.password === password;
}

export default model('Usuario',usuarioSchema)