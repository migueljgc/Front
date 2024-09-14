import React, { useEffect, useState } from 'react';
import '../Menus/Registro.css'
import axios from 'axios';

const Registro = () => {
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [identificationTypes, setIdentificationTypes] = useState([]);
    const [personTypes, setPersonTypes] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        numero: '',
        usuario: '',
        contraseña: '',
        confirmarContraseña: '',
        tipoIdentificacion: '',
        identificacion: '',
        tipoPersona: '',
        dependencia: 7,
    });

    useEffect(() => {
        document.title = "Registro"

        const fetchIdentificationTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/identification_type/get');
                console.log('Tipos de identificación obtenidos:', response.data);
                setIdentificationTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };

        const fetchPersonTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/person_type/get');
                console.log('Tipos de persona obtenidos:', response.data);
                setPersonTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de persona de la base de datos', error);
            }
        };

        fetchIdentificationTypes();
        fetchPersonTypes();
    }, []);

    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerrCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password);

        return minLength && hasUpperCase && hasNumber && hasSpecialChar && hasLowerrCase;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            numero: '',
            usuario: '',
            contraseña: '',
            confirmarContraseña: '',
            tipoIdentificacion: '',
            identificacion: '',
            tipoPersona: '',
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidPassword = validatePassword(formData.contraseña);
        if (!isValidPassword) {
            setPasswordError('La contraseña debe tener mínimo 8 caracteres, al menos un número, un signo y una letra mayúscula.');
            return;
        } else {
            setPasswordError('Contraseña valida');
        }

        if (formData.contraseña !== formData.confirmarContraseña) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            return;
        } else {
            setConfirmPasswordError('Contraseña valida');
        }


        try {
            console.log('Datos del formulario a enviar:', formData);

            const selectedIdentificationType = identificationTypes.find(type => type.idIdentificationType === parseInt(formData.tipoIdentificacion));
            const selectedPersonType = personTypes.find(type => type.idPersonType === parseInt(formData.tipoPersona));
            if (formData.contraseña === formData.confirmarContraseña) {
                const userResponse = await axios.post('http://localhost:8080/api/auth/register', {
                    personType: { idPersonType: selectedPersonType.idPersonType },
                    name: formData.nombre,
                    lastName: formData.apellido,
                    email: formData.correo,
                    identificationType: { idIdentificationType: selectedIdentificationType.idIdentificationType }, // Enviar el objeto completo
                    identificationNumber: parseInt(formData.identificacion),
                    user: formData.usuario,
                    password: formData.contraseña,
                    dependence: { idDependence: formData.dependencia },
                    number: parseInt(formData.numero)
                });
                alert('Se ha enviado un mensaje de verificacion a su correo, si no le aparece verifique la carpeta de spam.');
                console.log('Respuesta al guardar usuario:', userResponse.data);
                console.log('Usuario registrado correctamente');
                setConfirmPasswordError('')
                setPasswordError('')
                handleReset();

            }
            else {
                alert('Contraseñas no coinciden')
            }

        } catch (error) {
            console.error('Error al guardar información en la base de datos', error);
        }

    };

    return (
        <div className='Registro'>
            <div className="FormularioRegistro">

                <form className='forms' onSubmit={handleSubmit}>
                    <title className="Title">
                        Registrate
                    </title>
                    <div className="Campos">
                        <div className="labelsAndInputs">
                            <label >Tipo De Persona</label>
                            <select className='Selects'
                                id="tipoPersona"
                                name="tipoPersona"
                                value={formData.tipoPersona}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                {personTypes.map((type) => (
                                    <option key={type.idPersonType} value={type.idPersonType}>
                                        {type.namePersonType}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="labelsAndInputs">
                            <label >Tipo De Identificacion</label>
                            <select className='Selects'
                                id="tipoIdentificacion"
                                name="tipoIdentificacion"
                                value={formData.tipoIdentificacion}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione Tipo de Identificación</option>
                                {identificationTypes.map((type) => (
                                    <option key={type.idIdentificationType} value={type.idIdentificationType}>
                                        {type.nameIdentificationType}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="labelsAndInputs">
                            <label >Numero De Identificacion</label>
                            <input className='inputs'
                                type="text"
                                id="identificacion"
                                name="identificacion"
                                value={formData.identificacion}
                                onChange={handleChange} required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Nombres Completos</label>
                            <input className='inputs'
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange} required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Apellidos Completos</label>
                            <input className='inputs'
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange} required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Correo Electronico</label>
                            <input className='inputs'
                                type="email"
                                id="correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange} required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Telefono</label>
                            <input className='inputs'
                                type="text"
                                id="numero"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange} required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Usuario</label>
                            <input className='inputs'
                                type="text"
                                id="usuario"
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleChange} required />
                        </div>
                        <div className="labelsAndInputs">
                            <label >Contraseña</label>
                            <input className='inputs'
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                value={formData.contraseña}
                                onChange={handleChange} required
                            />
                            {passwordError && <div className='errore'> {passwordError}</div>}
                        </div>
                        <div className="labelsAndInputs">
                            <label >Confirmar Contraseña</label>
                            <input className='inputs'
                                type="password"
                                id="confirmarContraseña"
                                name="confirmarContraseña"
                                value={formData.confirmarContraseña}
                                onChange={handleChange} required
                            />
                            {confirmPasswordError && <div className='errore'> {confirmPasswordError}</div>}
                        </div>
                        <div className="Buton">
                            <button type="submit">Registrate</button>
                        </div>
                        <div className="labelAndA">
                            <label >Ya Tienes Cuenta?</label>
                            <a className='A' href="/Login">Inicia Sesion</a>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default Registro;
