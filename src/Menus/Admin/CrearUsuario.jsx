import React, { useEffect, useState } from 'react';
import '../Admin/CrearUsuario.css'
import axios from 'axios';
import { MenuAdmin } from '../../componentes/Menu';
import { UserinfoAmin } from '../../componentes/Userinfo';

const CrearUsuario = () => {
    const [passwordError, setPasswordError] = useState('');
    const [dependenceTypes, setDependence] = useState([]);
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
        dependencia: '',
        rol: '',
    });

    useEffect(() => {
        document.title = "Creacion de Usuario"

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
        const fetchDependence = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/dependence/get')
                console.log('Dependencias obtenidos:', response.data);
                setDependence(response.data);
            } catch (error) {
                console.error('Error al obtener el dependencias:', error);
            }
        };

    
        fetchDependence();
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
            dependencia: '',
            rol: '',
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

            const selectedDepenceType = dependenceTypes.find(type => type.idDependence === parseInt(formData.dependencia));
            const selectedIdentificationType = identificationTypes.find(type => type.idIdentificationType === parseInt(formData.tipoIdentificacion));
            const selectedPersonType = personTypes.find(type => type.idPersonType === parseInt(formData.tipoPersona));
            if (formData.contraseña === formData.confirmarContraseña) {
                const userResponse = await axios.post('http://localhost:8080/api/auth/registerUser', {
                    personType: { idPersonType: selectedPersonType.idPersonType },
                    name: formData.nombre,
                    lastName: formData.apellido,
                    email: formData.correo,
                    identificationType: { idIdentificationType: selectedIdentificationType.idIdentificationType }, // Enviar el objeto completo
                    identificationNumber: parseInt(formData.identificacion),
                    user: formData.usuario,
                    password: formData.contraseña,
                    dependence: { idDependence: selectedDepenceType.idDependence},
                    number: parseInt(formData.numero),
                    role: formData.rol,
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
        <div className='CrearUsuario'>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
            <div className="headers">
                    <h1 className="title">CREAR USUARIO</h1>
                    <div className="user-menu">
                        <UserinfoAmin/>

                    </div>
                </div>
                
                <div className="form">
                    <form className="solicitud-form" onSubmit={handleSubmit}>
                        <div className="input-box2">
                            <label >Tipo De Persona</label>
                            <select 
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
                        <div className="input-box2">
                            <label >Tipo De Identificacion</label>
                            <select 
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
                        <div className="input-box2">
                            <label >Numero De Identificacion</label>
                            <input 
                                type="text"
                                id="identificacion"
                                name="identificacion"
                                value={formData.identificacion}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-box2">
                            <label >Nombres Completos</label>
                            <input 
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-box2">
                            <label >Apellidos Completos</label>
                            <input 
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-box2">
                            <label >Correo Electronico</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-box2">
                            <label >Telefono</label>
                            <input 
                                type="text"
                                id="numero"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-box2">
                            <label >Usuario</label>
                            <input 
                                type="text"
                                id="usuario"
                                name="usuario"
                                value={formData.usuario}
                                onChange={handleChange} required />
                        </div>
                        <div className="input-box2">
                            <label >Contraseña</label>
                            <input 
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                value={formData.contraseña}
                                onChange={handleChange} required
                            />
                            {passwordError && <div className='errore'> {passwordError}</div>}
                        </div>
                        <div className="input-box2">
                            <label >Confirmar Contraseña</label>
                            <input 
                                type="password"
                                id="confirmarContraseña"
                                name="confirmarContraseña"
                                value={formData.confirmarContraseña}
                                onChange={handleChange} required
                            />
                            {confirmPasswordError && <div className='errore'> {confirmPasswordError}</div>}
                        </div>
                        <div className="input-box2">
                        <label >Roles:</label><br />
                            <select
                                id="rol"
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                <option value="USER">USER</option>
                                <option  value="ADMIN">ADMIN</option>
                                <option  value="SECRE">SECRE</option>
                            </select>
                        </div>
                        <div className="input-box2">
                        <label>Dependencia:</label><br />
                            <select
                                id="dependencia"
                                name="dependencia"
                                value={formData.dependencia}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                {dependenceTypes.map((type) => (
                                    <option key={type.idDependence} value={type.idDependence}>
                                        {type.nameDependence}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="Buton">
                            <button type="submit">Registrate</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CrearUsuario;
