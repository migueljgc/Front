import React, { useEffect, useState } from 'react';
import '../Admin/GestionUsuario.css'
import { MenuAdmin } from '../../componentes/Menu';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const GestionUsuario = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Usuario/get',{
                'Authorization': `Bearer ${token}`
            })
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
            name: 'Nombre',
            selector: row => row.name
        },
        {
            name: 'Apellido',
            selector: row => row.lastName
        },
        {
            name: 'Identificacion',
            selector: row => row.identificationNumber
        },
        {
            name: 'Rol',
            selector: row => row.role
        },
        {
            name: 'Estado',
            selector: row => row.stateUser
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
