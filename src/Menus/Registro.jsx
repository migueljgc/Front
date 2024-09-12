import React from 'react';
import '../Menus/Registro.css'

const Registro = () => {
    return (
        <div className='Registro'>
            <div className="FormularioRegistro">
                
                <form className='forms'>
                    <div className="titulo">
                        <h1>Registrate</h1>
                    </div>
                    <div className="Campos">
                        <div className="labelsAndInputs">
                            <label >Tipo De Persona</label>
                            <input className='inputs' type="text" required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Tipo De Identificacion</label>
                            <input className='inputs' type="text" required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Numero De Identificacion</label>
                            <input className='inputs' type="text" required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Nombres Completos</label>
                            <input className='inputs' type="text" required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Apellidos Completos</label>
                            <input className='inputs' type="text" required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Correo Electronico</label>
                            <input className='inputs' type="text" required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Telefono</label>
                            <input className='inputs' type="text" required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Usuario</label>
                            <input className='inputs' type="text" required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Contraseña</label>
                            <input className='inputs' type="text" required />
                        </div>


                    </div>
                </form>
            </div>

        </div>
    );
}

export default Registro;
