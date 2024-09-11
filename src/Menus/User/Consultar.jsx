import React, { useEffect, useState } from 'react';
import '../User/Consultar.css'
import {Menu }from '../../componentes/Menu';
import axios from 'axios';
import DataTable from 'react-data-table-component';


const Consultar = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/request/get')
            setData(response.data);
            const usuario = localStorage.getItem('users');
            console.log(usuario)
            if (usuario) {
                const filteredData = response.data.filter(item => item.user && item.user.user === usuario); // Filtrar los datos por el usuario
                filteredData.forEach(item => {
                    item.date = new Date(item.date).toDateString();

                });
                setData(filteredData);
                console.log("filteredData  ", filteredData)
            } else {
                setData([]);
            }
            console.log(response.data);
            console.log("esta es la data ", data);
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    useEffect(() => {
        document.title = "Consultar PQRS"
        fetchData();
    }, []);
    const columns = [
        {
            name: 'Tipo de Solicitud',
            selector: row => row.requestType.nameRequestType
        },
        {
            name: 'Fecha',
            selector: row => row.date
        },
        {
            name: 'Descripcion',
            selector: row => row.description
        },
        {
            name: 'Estado',
            selector: row => row.requestState.nameRequestState
        },        
        {
            name: 'Respuesta',
            selector: row => row.answer
        },
        {
            name: 'Accion'
           
        },
        
    ]

    return (
        <div className='consultarPqrs'>
            <div className="menus">
                <Menu />
            </div>
            <div className="cuerpo">
                <h1 className="title">CONSULTAR SOLICITUD</h1>
                <div className="form">
                    <form className="solicitud-form">
                        <div className="busqueda">
                            <label>Introduce Tu Numero De Radicado</label>
                            <input type="text" />
                        </div>
                        <label className='nota' >Nota: Con La X Puede Cancelar Su Solicitud</label>
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

export default Consultar;
