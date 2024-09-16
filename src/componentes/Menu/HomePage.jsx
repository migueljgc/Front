import React from 'react';
import './HomePage.css';
import { Menu, MenuAdmin } from '../Menu.jsx';
import { UserinfoAmin, UserinfoUser } from '../Userinfo.jsx';

export const HomePage = () => {
    const name = localStorage.getItem('users');
    return (
        <div className="HomePage">
            <div className="menus">
                <Menu />
            </div>
            <div className="cuerpos">
                <div className="headers">
                    <title className='titulo'>Bienvenido {name}</title>
                    <div className="user-menu">
                        <UserinfoUser />

                    </div>
                </div>
                <div className="mision">
                    <p className='p1'>Mision: </p>
                    <p className='p2'>Brindar soluciones efectivas a través de una atención ágil, transparente y empática, gestionando cada petición, queja reclamo y sugerencia con el compromiso de mejorar continuamente la experiencia de nuestros usuarios.</p>
                </div>
            </div>
        </div>

    );
};

export const HomePageAdmin = () => {
    const name = localStorage.getItem('users');
    return (
        <div className="HomePage">
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
                <div className="headers">
                    <title className='titulo'>Bienvenido {name}</title>
                    <div className="user-menu">
                        <UserinfoAmin />

                    </div>
                </div>

                <div className="mision">
                    <p className='p1'>Mision: </p>
                    <p className='p2'>Brindar soluciones efectivas a través de una atención ágil, transparente y empática, gestionando cada petición, queja reclamo y sugerencia con el compromiso de mejorar continuamente la experiencia de nuestros usuarios.</p>
                </div>

            </div>
        </div>

    );
};
