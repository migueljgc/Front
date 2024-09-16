import React, { useEffect, useState } from 'react';
import '../Admin/CrearCategoria.css'
import axios from 'axios';
import { MenuAdmin } from '../../componentes/Menu';

const CrearCategoria = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        category: '',
        dependence: '',
    });

    const fetchDependence = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/dependence/get')
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        document.title = "Crear Categoria"
        fetchDependence();
    }, []);

    const handleReset = () => {
        setFormData({
            category: '',
            dependence: '',
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Datos del formulario a enviar:', formData);
            const selectedDependencia = data.find(type => type.idDependence === parseInt(formData.dependence));
            const categoryResponse = await axios.post('http://localhost:8080/api/category/save', {
                nameCategory: formData.category,
                dependence: { idDependence: selectedDependencia ? selectedDependencia.idDependence : null },
            });
            console.log('Respuesta al guardar Categoria:', categoryResponse.data);
            console.log('Categoria registrada correctamente');
            alert('Categoria registrada correctamente')
            handleReset();


        }
        catch (error) {
            console.error('Error al guardar información:', error);
        }

    }
    return (
        <div className='CrearCategoria'>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
                <h1 className="title">CREAR CATEGORIA</h1>
                <div className="form">
                    <form className="solicitud-form" onSubmit={handleSubmit}>
                        <div className="input-box">
                            <label className='category' htmlFor="category">Nombre De Categoria:</label><br />
                            <input
                            className='category'
                                type="category"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange} required
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="dependence">Dependencia:</label><br />
                            <select
                                type="text"
                                id="dependence"
                                name="dependence"
                                value={formData.dependence}
                                onChange={handleChange} required
                            >
                                <option key="" value="">Seleccione el tipo</option>
                                {data.map((type) => (
                                    <option key={type.idDependence} value={type.idDependence}>
                                        {type.nameDependence}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button className="btnCrearCat" type="submit">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CrearCategoria;
