import React, { useEffect, useState } from 'react';
import '../Admin/GestionUsuario.css'
import { MenuAdmin } from '../../componentes/Menu';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserinfoAmin } from '../../componentes/Userinfo';

const GestionUsuario = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
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
    const handleCrear = () => {
        navigate('/CrearUsuario')
    }
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
        {
            name: 'Editar',
        },

    ]
    return (
        <div className='GestionUsuario'>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
            <div className="headers">
                     <h1 className="title">GESTION USUARIO</h1>
                    <div className="user-menu">
                        <UserinfoAmin/>

                    </div>
                </div>
               
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

export default GestionUsuario;
