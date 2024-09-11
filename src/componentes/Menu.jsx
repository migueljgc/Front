import React from 'react';
import '../componentes/Menu.css'
import { useNavigate } from 'react-router-dom';
import { FaPenClip } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";
import { RiContactsBook2Line } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";


export const Menu = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('logget', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify(''));
    navigate('/Login');
  };

  const handleCreate = () => {
    navigate('/Crear')
  }
  const handleConsultar = () => {
    navigate('/Consultar')
  }
  return (
    <div className="Menu">
      <div className="logo"></div>
      <div className="opciones">
        <div className="crearpqrs">
          <nav>
            <ul>
              <li onClick={handleCreate}><FaPenClip className='icon' /> Crear PQRS</li>
            </ul>
          </nav>

        </div>
        <div className="consultarpqrs">
          <nav>
            <ul>
              <li onClick={handleConsultar}><FaMagnifyingGlass className='icon' />   Consultar PQRS</li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="salir">
        <nav>
          <ul>
            <li onClick={handleLogout}><ImExit className='icon' /> Salir</li>
          </ul>
        </nav>
      </div>
    </div>

  )
}

export const MenuAdmin = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('logget', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify(''));
    navigate('/Login');
  };

  const handleCreate = () => {
    navigate('/Crear')
  }
  const handleConsultar = () => {
    navigate('/Consultar')
  }
  return (
    <div className="Menu">

      <div className="logo"></div>

      <div className="opciones">
        <div className="dashboard">
          <nav>
            <ul>
              <li onClick={handleCreate}><VscGraph className='icon' /> Dashboard</li>
            </ul>
          </nav>
        </div>
        <div className="gestionuser">
          <nav>
            <ul>
              <li onClick={handleConsultar}><RiContactsBook2Line className='icon' /> Gestion Usuario</li>
            </ul>
          </nav>
        </div>
        <div className="gestioncate">
          <nav>
            <ul>
              <li onClick={handleConsultar}><RxDashboard  className='icon' /> Gestion Categorias</li>
            </ul>
          </nav>
        </div>
        <div className="gestiondepe">
          <nav>
            <ul>
              <li onClick={handleConsultar}><IoHomeOutline className='icon' /> Gestion Dependencias</li>
            </ul>
          </nav>
        </div>

      </div>

      <div className="salir">
        <nav>
          <ul>
            <li onClick={handleLogout}><ImExit className='icon' /> Salir</li>
          </ul>
        </nav>
      </div>
    </div>

  )
}

export const MenuSecre = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('logget', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify(''));
    navigate('/Login');
  };

  const handleCreate = () => {
    navigate('/Crear')
  }
  const handleConsultar = () => {
    navigate('/Consultar')
  }
  return (
    <div className="Menu">
      <div className="logo"></div>
      <div className="opciones">
        <div className="crearpqrs">
          <nav>
            <ul>
              <li onClick={handleCreate}><FaPenClip className='icon' /> Crear PQRS</li>
            </ul>
          </nav>

        </div>
        <div className="consultarpqrs">
          <nav>
            <ul>
              <li onClick={handleConsultar}><FaMagnifyingGlass className='icon' />   Consultar PQRS</li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="salir">
        <nav>
          <ul>
            <li onClick={handleLogout}><ImExit className='icon' /> Salir</li>
          </ul>
        </nav>
      </div>
    </div>

  )
}