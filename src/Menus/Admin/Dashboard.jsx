import React from 'react';
import '../Admin/Dashboard.css'
import { MenuAdmin } from '../../componentes/Menu';
import { UserinfoAmin } from '../../componentes/Userinfo';

const Dashboard = () => {
    return (
        <div className='Dashboard'>
            <div className="menus">
                <MenuAdmin />
            </div>
            <div className="cuerpos">
                <div className="headers">
                    <h1 className="title">DASHBOARD</h1>
                    <div className="user-menu">
                        <UserinfoAmin/>

                    </div>
                </div>

                <div className="form">
                    <div className="formdash">
                        <div class="totalprs">
                            <h1 className="">Total PQRS</h1>
                        </div>
                        <div class="totalpqrsdepe">
                            <h1 className="">Total PQRS por Dependencia</h1>
                        </div>
                        <div class="totalpqrsmes">
                            <h1 className="">PQRS Por Mes</h1>
                        </div>
                        <div class="totalpqrsdepemes">
                            <h1 className="">PQRS Por Dependencia al Mes</h1>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
