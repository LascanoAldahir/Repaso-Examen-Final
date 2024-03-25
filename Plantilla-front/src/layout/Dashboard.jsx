import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contex/AuthProvider";

const Dashboard = () => {
  const location = useLocation();
  const urlActual = location.pathname;
  const { auth } = useContext(AuthContext);
  const autenticado = localStorage.getItem("token");
  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 bg-purple-800 p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          NOMBRE
        </h2>

        <div className="flex items-center justify-center mb-8">
          <img
            src="/images/chicos.png"
            alt="img-client"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
        </div>
        
        <div className="text-center mb-4">
          <p className="text-white">Bienvenido - {auth?.nombre}</p>
      
        </div>

        <hr className="border-purple-400 mb-8" />

        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`${
                urlActual === "/dashboard"
                  ? "text-white bg-purple-600 px-3 py-2 rounded-md block"
                  : "text-purple-200 hover:text-white hover:bg-purple-600 px-3 py-2 rounded-md block"
              }`}
            >
              Perfil
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/listar"
              className={`${
                urlActual === "/dashboard/listar"
                  ? "text-white bg-purple-600 px-3 py-2 rounded-md block"
                  : "text-purple-200 hover:text-white hover:bg-purple-600 px-3 py-2 rounded-md block"
              }`}
            >
              Listar
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/crear"
              className={`${
                urlActual === "/dashboard/crear"
                  ? "text-white bg-purple-600 px-3 py-2 rounded-md block"
                  : "text-purple-200 hover:text-white hover:bg-purple-600 px-3 py-2 rounded-md block"
              }`}
            >
              Crear
            </Link>
          </li>
          
        </ul>
      </div>

      <div className="flex-1 bg-gray-100">
        <div className="bg-purple-800 py-4 flex justify-between items-center px-8">
          <div className="text-lg font-semibold text-white">
            Bienvenido - {auth?.nombre}
          </div>
          <div>
            <img
              src="/images/chicos.png"
              alt="img-client"
              className="w-10 h-10 rounded-full border-2 border-green-600"
            />
          </div>
          <div>
            <Link
              to="/"
              className="text-white hover:bg-red-900 px-4 py-2 rounded-lg"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Salir
            </Link>
          </div>
        </div>
        <div className="p-8 overflow-y-scroll h-full">
          {autenticado ? <Outlet /> : <Navigate to="/login" />}
        </div>
        <div className="bg-purple-800 py-4 text-white text-center text-sm">
          Todos los derechos reservados por el Grupo 4
        </div>
      </div>
    </div>
  );

};

export default Dashboard;
