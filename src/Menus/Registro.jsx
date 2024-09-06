import React from 'react';
import '../Menus/Registro.css'

const Registro = () => {
    return (
        <div className='Registro'>
            <div className="FormularioRegistro">
                
                <form className='forms'>
                    <div className="Titulo">
                        <h1>Registrate</h1>
                    </div>
                    <div className="Campo">
                        <div className="labels"><label >Tipo De Persona</label><br />
                            <label >Tipo De Identificacion</label><br />
                            <label >Numero De Identificacion</label><br />
                            <label >Nombres Completos</label><br />
                            <label >Apellidos Completos</label><br />
                            <label >Correo Electronico</label><br />
                            <label >Telefono</label><br />
                            <label >Usuario</label><br />
                            <label >Contraseña</label>
                        </div>
                        <div className="inputs">
                            <input type="text" required />
                            <input type="text" required />
                            <input type="text" required />
                            <input type="text" required />
                            <input type="text" required />
                            <input type="text" required />
                            <input type="text" required />
                            <input type="text" required />
                            <input type="text" required />
                        </div>

                    </div>
                </form>
            </div>

        </div>
    );
}

export default Registro;
