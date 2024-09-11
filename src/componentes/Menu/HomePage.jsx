import React from 'react';
import './HomePage.css';
import {Menu, MenuAdmin} from '../Menu.jsx';

export const HomePage = () => {
    return (
        <div className="HomePage">
            <div class="menus">
                <Menu />
            </div>
            <div class="cuerpos">
                <div className="fondo1"><p>dd</p></div>
                <div className="fondo2"><p>dd</p></div>
            </div>
        </div>

    );
};

export const HomePageAdmin = () => {
    return (
        <div className="HomePage">
            <div class="menus">
                <MenuAdmin  />
            </div>
            <div class="cuerpos">
                <div className="fondo1"><p>dd</p></div>
                <div className="fondo2"><p>dd</p></div>
            </div>
        </div>

    );
};
