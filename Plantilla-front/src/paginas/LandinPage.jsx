import estudiante1 from '../assets/estudiante1.png'

import { useState } from 'react'
import {Link} from 'react-router-dom'


export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false)
    return (
        <div className={darkMode ? "dark" :""}>

            <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
                <section>
                    <nav className='p-10 mb-12 flex justify-between'>
                        <h1 className='text-2xl font-bold dark:text-white'>NOMBRE...</h1>
                        <ul className='flex items-center'>
                            
                            <li><Link to="/login" className='bg-gray-600 text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white' href="#">Login</Link></li>
                        </ul>
                    </nav>

                    <div className='text-center'>
                        <h2 className='text-5xl py-2 text-bg-purple-800 font-medium md:text-6xl'>Examen Final de Carrera</h2>
                        <h3 className='text-2xl py-2 md:text-3xl dark:text-white'>Integrantes</h3>
                        <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>David Lascano y Andrew Vilcacundo </p>
                    </div>

                    

                    <div className='relative mx-auto  bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
                        <img src={estudiante1} alt="estudiante" />
                    </div>
                </section>

                

            </main>

        </div>
    )
}
