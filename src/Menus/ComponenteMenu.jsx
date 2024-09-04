import './MenuUsuario.css';

function ComponenteMenu() {
    return (
        <>
            <div className='Contenedori'>
                <div className="Titulo">
                    <h1>Menu Usuario</h1>
                </div>
                <div className="Botonera">
                    <button type="submit">Crear PQRS</button>
                    <button type="submit">Consultar PQRS</button>
                    <button type="submit">Salir</button>
                </div>
            </div>
        </>
    );
}

export default ComponenteMenu;