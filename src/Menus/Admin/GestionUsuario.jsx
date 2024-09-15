import React, { useEffect, useState } from 'react';
import '../Admin/GestionUsuario.css'
import { MenuAdmin } from '../../componentes/Menu';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const GestionUsuario = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/get')
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    useEffect(() => {
        document.title = "Gestionar Usuarios"
        fetchData();
    }, []);
    const columns = [
        {
            name: 'Usuario',
            selector: row => row.user
        },
        {
            name: 'Contraseña',
            selector: row => row.password
        },
        {
            name: 'Estdo de Usuario',
            selector: row => row.stateUser
        },
        {
            name: 'Dependencia',
            selector: row => row.dependence.nameDependence
        },
        {
            name: 'Tipos de Persona',
            selector: row => row.personType.namePersonType
        },
    ]
    return (
        <div className='GestionUsuario'>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
                <h1 className="title">CONSULTAR SOLICITUD</h1>
                <div className="form">
                    <form className="solicitud-form">
                        <div className="busqueda">
                            <input type="text" placeholder='Buscar' />
                        </div>

                        <DataTable
                            columns={columns}
                            data={data}
                            fixedHeader
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GestionUsuario;
