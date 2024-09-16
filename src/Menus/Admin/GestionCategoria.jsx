import React, { useEffect, useState } from 'react';
import '../Admin/GestionCategoria.css'
import axios from 'axios';
import { MenuAdmin } from '../../componentes/Menu';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';


const GestionCategoria = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/category/get')
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    useEffect(() => {
        document.title = "Gestion de Categorias"
        fetchData();
    }, []);
    const handleCrear = () => {
        navigate('/CrearCategoria')
    }
    const columns = [
        {
            name: 'Categoria',
            selector: row => row.nameCategory
        },
        {
            name: 'Dependencia',
            selector: row => row.dependence.nameDependence
        },
        {
            name: 'Editar'
        }

    ]

    return (
        <div className='GestionCategoria'>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
                <h1 className="title">GESTION DE CATEGORIAS</h1>
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

export default GestionCategoria;
