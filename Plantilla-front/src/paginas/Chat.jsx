import React, { useEffect, useState,useContext } from "react";
import io from "socket.io-client";
import AuthContext from "../contex/AuthProvider";
const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const {auth} = useContext(AuthContext)

  const authen = {
    rol: auth.rol,
    nombre: auth.nombre,
    apellido: auth.apellido,
  };
  const handleMensajeChat = () => {
    if (socket && mensaje.trim() !== "") {
      socket.emit("enviar-mensaje-fron-back", { contenido: mensaje, auth: authen });
      setMensajes([...mensajes, { contenido: mensaje, esMio: true, auth: authen }]);
      setMensaje(""); // Limpiar el campo de entrada después de enviar el mensaje
    }
  };

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND);
    setSocket(newSocket);

    newSocket.on("mensaje-desde-servidor", (data) => {
      setMensajes([...mensajes, { contenido: data.mensaje, esMio: false, auth: data.auth }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [mensajes]);

  return (
    <div className="flex flex-col justify-between h-[100%] bg-gray-200 ">
      <div className="flex flex-col flex-grow overflow-y-auto p-4 gap-3">
        {mensajes.map((msg, index) => (
          <div key={index} className={`max-w-xs ${msg.esMio ? "ml-auto" : "mr-auto"}`}>
            <div
              className={`rounded-lg p-2 ${
                msg.esMio ? "bg-green-700 text-white" : "bg-gray-800 text-white"
              }`}
            >
              <p>{msg.contenido}</p>
              <p className="text-xs text-gray-300">
                {msg.auth.rol? msg.auth.rol.charAt(0).toUpperCase() + msg.auth.rol.slice(1): "Sin rol"}: {msg.auth.nombre || "Anónimo"} {msg.auth.apellido || ""}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t-2 border-gray-200 p-4">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Escribe tu mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="flex-1 w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-white rounded-md py-2 mr-2"
          />
          <button
            onClick={handleMensajeChat}
            className="inline-flex items-center justify-center w-12 h-12 text-white bg-green-700 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
