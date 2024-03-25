import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import AuthContext from '../contex/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';

const Login = () => {
    const navigate = useNavigate();
    const { setAuth, setEstado } = useContext(AuthContext);
    const [mensaje, setMensaje] = useState({});

    const [form, setform] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = form.password.includes("vet")
            ? `${import.meta.env.VITE_BACKEND_URL}/paciente/login`
            : `${import.meta.env.VITE_BACKEND_URL}/login`;
        const rol = form.password.includes("vet")
            ? "paciente"
            : "veterinario";
        try {
            const respuesta = await axios.post(url, form);
            localStorage.setItem('token', respuesta.data.token);
            localStorage.setItem('rol', rol);
            setAuth(respuesta.data);
            navigate('/dashboard');
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setform({});
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };

    return (
        <>
            <div className="md:w-1/2">  
                <div className="bg-white h-full flex justify-center items-center">
                    
                    <div className="w-4/5" style={{ fontFamily: 'Baskerville' }}>
                    
                        <img src="/images/matriculas.jpg" className="img-fluid" alt="Sample image" style={{ marginLeft: '50px', maxWidth: '100%', height: 'auto' }} />
        
                        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
    
                        <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-700">Inicio de Sesión</h1>
                        <small className="text-gray-500 block my-4 text-sm">¡Bienvenido! Por favor ingresa tus credenciales</small>
        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold text-gray-600">Correo</label>
                                <input
                                    type="email"
                                    placeholder="Ingresa tu correo electrónico"
                                    name='email'
                                    value={form.email || ""}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                                />
                            </div>
        
                            <div className="mb-3">
                                <label className="mb-2 block text-sm font-semibold text-gray-600">Contraseña</label>
                                <input
                                    type="password"
                                    placeholder="********************"
                                    name='password'
                                    value={form.password || ""}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                                />
                            </div>
        
                            <div className="my-4">
                                <button className="py-2 w-full block text-center bg-purple-700 text-white border rounded-xl hover:scale-100 duration-300 hover:bg-purple-800">
                                    Login
                                </button>
                            </div>
                        </form>
        
                       
        
                        <div className="mt-3 text-sm flex justify-center items-center" >
                            <Link to="/register" className="py-2 px-5 bg-purple-700 text-white border rounded-xl hover:scale-110 duration-300 hover:bg-purple-800" >
                                Crear Cuenta
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
    
};

export default Login;
