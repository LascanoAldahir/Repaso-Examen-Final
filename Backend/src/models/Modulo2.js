import mongoose, {Schema,model} from 'mongoose'


const modulo2Schema = new Schema({

    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    tratamientos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tratamiento'
        }
    ],

    nombre:{
        type:String,
        require:true,
        trim:true
    },
    propietario:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
    celular:{
        type:String,
        require:true,
        trim:true
    },
    convencional:{
        type:String,
        require:true,
        trim:true
    },
    ingreso:{
        type:Date,
        require:true,
        trim:true,
        default:Date.now()
    },
    sintomas:{
        type:String,
        require:true,
        trim:true
    },
    salida:{
        type:Date,
        require:true,
        trim:true,
        default:Date.now()
    },
    estado:{
        type:Boolean,
        default:true
    },
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    }
},{
    timestamps:true
})

// Método para cifrar el password del paciente
modulo2Schema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
modulo2Schema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

export default model('Modulo2',modulo2Schema)       