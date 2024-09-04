import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLogged, setIsLogged] = useState('');

    useEffect(() => {
        document.title = "Login"
        const storedUsername = localStorage.getItem('username');


        if (storedUsername) {
            setUser(storedUsername);
            setRememberMe(true);
        }
        checkLoginStatus();
    }, []);
    const checkLoginStatus = () => {
        const logged = localStorage.getItem('logget') === 'true';
        setIsLogged(logged);
        console.log('Logget: ', logged);
        if (logged) {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                const { role } = userData;
                if (role === 'ADMIN') {
                    navigate('/HomePagesAdmin');
                } else if (role === 'USER') {
                    navigate('/HomePage');
                } else if (role === 'SECRE') {
                    navigate('/HomePagesSecre');
                }
            }
        }

    };
    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', {
                user,
                password,
            });
            console.log(response)
            if (response.status === 200) {
                const responseData = response.data;
                console.log(responseData)

                const { token, authorities } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify({ user, role: authorities[0] })); // Assuming single role
                const response1 = await axios.get('http://localhost:8080/api/auth/editar', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const stateUser = response1.data.stateUser;
                console.log(stateUser)
                if (stateUser === 'INACTIVO') {
                    alert('Usuario Inactivo');
                    return;
                }
                localStorage.removeItem('username');
                const users = (response1.data.user)
                console.log(users)
                localStorage.setItem('users', users);
                if (authorities.includes('ADMIN')) {
                    window.location.href = '/HomePagesAdmin';
                    localStorage.setItem('logget', true);
                } else if (authorities.includes('USER')) {
                    window.location.href = '/ComponenteMenu';
                    localStorage.setItem('logget', true);
                } else if (authorities.includes('SECRE')) {
                    window.location.href = '/HomePagesSecre';
                    localStorage.setItem('logget', true);
                } else {

                    window.location.href = '/';

                }

            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al obtener los datos de la base de datos:', error);
            alert('Credenciales incorrectas');
        }

        if (rememberMe) {
            localStorage.removeItem('username')
            localStorage.setItem('username', user);
        }
    }
    if (isLogged) {
        return null; // o un spinner si quieres mostrar algo mientras se redirige
    }

    return (
        <div className="content">
            <div className="Formulario" onSubmit={onLogin}>
                <form>
                    <div className="Titulo">
                        <h1>Iniciar Sesión</h1>
                    </div>
                    <div className="Campo">
                        <input placeholder='Usuario' type="text" id="user" value={user} onChange={e => setUser(e.target.value)} required />
                    </div>
                    <div className="Campo">
                        <input placeholder='Contraseña' type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="Botones">
                        <button type="submit">Sign Up</button>
                    </div>
                    <div className="Checkbox">
                        <div className="CheckboxYRegistro">
                            <a href="/Registro">Registrar</a>
                            <label>
                                <input type="checkbox" checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)} />
                                Recordar
                            </label>
                        </div>
                    </div>
                    <div className="OlvidasteContra">
                        <a href="/Recuperacion">¿Olvidaste tu contraseña?</a>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
