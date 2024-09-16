import React, { useEffect, useState } from 'react';
import { MenuAdmin } from '../../componentes/Menu';
import '../Admin/GestionDependencia.css'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GestionDependencia = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/dependence/get')
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    useEffect(() => {
        document.title = "Gestion de Dependencias"
        fetchData();
    }, []);
    const handleCrear = () => {
        navigate('/CrearDependencias')
    }
    const columns = [
        {
            name: 'Nombre Dependencia',
            selector: row => row.nameDependence
        },

    ]
    return (
        <div className='GestionDependencia'>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
                <h1 className="title">GESTION DE DEPENDENCIAS</h1>
                <div className="form">
                    <form className="solicitud-form">
                        <div className="busqueda">
                            <input type="text" placeholder='Buscar' />
                            <button className='btnCrear' onClick={handleCrear}  >Crear</button>
                        </div>

                        <DataTable
                            columns={columns}
                            data={data}
                            responsive
                            pagination
                            paginationPerPage={7}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GestionDependencia;
