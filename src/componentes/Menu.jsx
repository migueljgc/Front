import React from 'react';
import Logo from './Menu/Logo.jsx';
import '../componentes/Menu.css'
import { useNavigate } from 'react-router-dom';


const Menu = () => {
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
  return (
    <div className="Menu">
      <div className="logo">
      </div>
      <div className="crearpqrs">
        <nav>
          <ul>
            <li onClick={handleCreate}>Crear PQRS</li>
          </ul>
        </nav>

      </div>
      <div className="consultarpqrs">
        <nav>
          <ul>
            <li>Consultar PQRS</li>
          </ul>
        </nav>

      </div>
      <div className="salir">
        <nav>
          <ul>
            <li onClick={handleLogout}>Salir</li>
          </ul>
        </nav>
      </div>
      <div className="usuario"></div>
      <div className="logo">
      </div>

    </div>
  )
}

export default Menu;
