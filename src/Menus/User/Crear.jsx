import React, { useState, useEffect, useRef } from 'react';
import '../User/Crear.css'
import Menu from '../../componentes/Menu';
import axios from 'axios';

const Crear = () => {

    const [formData, setFormData] = useState({
        medioRespuesta: '',
        answer: '',
        category: '',
        date: '',
        description: '',
        idRequest: '',
        mediumAnswer: '',
        requestState: '',
        requestType: '',
        dependencia: '',
    });
    const [categoriasTypes, setCategorias] = useState([]);
    const [date, setFecha] = useState('');
    const [requestType, setRequest] = useState([]);
    const [dependencias, setDependencias] = useState([]);
    const [filteredCategorias, setFilteredCategorias] = useState([]);
    const token = localStorage.getItem('token');
    const [archivo, setArchivo] = useState(null);
    const fileInputRef = useRef(null);


    useEffect(() => {
        document.title = "Crear Solicitud"
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/category/get');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener categorias:', error);
            }
        };

        const fetchRequest = async () => {
            try {
                const response1 = await axios.get('http://localhost:8080/api/request_type/get');
                setRequest(response1.data);
            } catch (error) {
                console.error('Error al obtener Tipos de solicitudes', error);
            }
        };

        const fetchDependencias = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/dependence/get');
                setDependencias(response.data);
            } catch (error) {
                console.error('Error al obtener dependencias:', error);
            }
        };

        const obtenerFecha = () => {
            const fechaActual = new Date();
            const fechaFormat = fechaActual.toISOString().slice(0, 10);
            setFecha(fechaFormat);
            console.log(fechaFormat)
            //setFormData(prevFormData => ({ ...prevFormData, date: fechaFormat }));
            console.log(formData)
        };
        const fetchUser = async () => {
            const response1 = await axios.get('http://localhost:8080/api/auth/editar', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const user = (response1.data.user)
            console.log(response1.data)
            const username = user;
            if (username) {
                setFormData(prevFormData => ({ ...prevFormData, user: username }));
            }
        }

        fetchRequest();
        fetchCategorias();
        fetchDependencias();
        obtenerFecha();
        fetchUser();

    }, []);
    const handleFileChange = (e) => {
        setArchivo(e.target.files[0])
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dependencia') {
            const dependenciaId = Number(value);
            setFormData(prevState => ({ ...prevState, dependencia: value }));

            const filtered = categoriasTypes.filter(cat => cat.dependence.idDependence === dependenciaId);
            setFilteredCategorias(filtered);

        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleReset = () => {
        const fechaActual = new Date();
        const fechaFormat = fechaActual.toISOString().slice(0, 10);
        setFormData({
            medioRespuesta: '',
            answer: '',
            category: '',
            date: '',
            description: '',
            idRequest: '',
            mediumAnswer: '',
            requestState: '',
            requestType: '',
            dependencia: '',
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response1 = await axios.get('http://localhost:8080/api/auth/editar', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const user = response1.data.user
            console.log(user)
            const formDataToSend = new FormData();
            const selectedCategoria = categoriasTypes.find(type => type.idCategory === parseInt(formData.category));
            const selectedRequestType = requestType.find(type => type.idRequestType === parseInt(formData.requestType));
            console.log(formData)
            const StateRequest = { idRequestState: 1 };
            if (archivo) {
                formDataToSend.append('archivo', archivo);
                console.log(archivo)
            }
            formDataToSend.append('request', new Blob([JSON.stringify({
                description: formData.description,
                mediumAnswer: formData.mediumAnswer,
                category: { idCategory: selectedCategoria ? selectedCategoria.idCategory : null },
                requestType: { idRequestType: selectedRequestType ? selectedRequestType.idRequestType : null },
                requestState: StateRequest,
                dependence: { idDependence: parseInt(formData.dependencia) },
                date: date
            })], {
                type: 'application/json'
            }));
            const respuesta = await axios.post('http://localhost:8080/api/request/save', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(respuesta.data)
            const responseData = respuesta.data;
            const numRadicado = responseData.requestState;
            console.log(response1.data)

            alert('Solicitud Radicada Con Exito Su Numero De Radicado es: ' + numRadicado);
            handleReset();
        } catch (error) {
            console.error('Error al guardar información:', error.response ? error.response.data : error.message);
        }
        
    };

    return (
        <div className="Crear">
            <div className="header">
                <Menu />
            </div>
            <div className="cuerpo">
                <h1 className="title">CREA TU SOLICITUD</h1>
                <div className="form">
                    <form className="solicitud-form" onSubmit={handleSubmit}>
                    <input type='hidden' name="date" value={date} />
                        <div className="form-group">
                            <label>Tipo De Solicitud</label>
                            <select
                                id="requestType"
                                name="requestType"
                                value={formData.requestType}
                                onChange={handleChange}
                                required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                {requestType.map((type) => (
                                    <option key={type.idRequestType} value={type.idRequestType}>
                                        {type.nameRequestType}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Dependencia</label>
                            <select
                                id="dependencia"
                                name="dependencia"
                                value={formData.dependencia}
                                onChange={handleChange}
                                required>
                                <option key="" value="">Seleccione la dependencia</option>
                                {dependencias.map((dep) => (
                                    <option key={dep.idDependence} value={dep.idDependence}>
                                        {dep.nameDependence}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Categoría</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option key="" value="">Seleccione la categoría</option>
                                {filteredCategorias.map((type) => (
                                    <option key={type.idCategory} value={type.idCategory}>
                                        {type.nameCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Medio De Respuesta</label>
                            <select
                                type="mediumAnswer"
                                id="mediumAnswer"
                                name="mediumAnswer"
                                value={formData.mediumAnswer}
                                onChange={handleChange}
                                required>
                                <option value="">Seleccione el tipo</option>
                                <option value="Correo">Correo</option>
                                <option value="Numero">Numero</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Concepto De Solicitud</label>
                            <textarea name="description"
                                id="description" rows="4" value={formData.description}
                                onChange={handleChange}
                                required></textarea>
                        </div>
                        <div className="form-group">
                            <label>Adjuntar Archivo</label>
                            <input type="file" className="file-input-button" id='file'
                            onChange={handleFileChange} 
                            ref={fileInputRef}
                            name='archivo'/>

                        </div>
                        <button type="submit" className="submit-btn">Enviar</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Crear;
