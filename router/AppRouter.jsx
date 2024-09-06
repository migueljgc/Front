import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../router/ProtectedRoute';
import  Login  from '../src/Menus/Login';
import { Navbar } from '../Navbar';
import  HomePage  from '../src/componentes/Menu/HomePage';
import Crear from '../src/Menus/User/Crear';
import Registro from '../src/Menus/Registro';


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Login />} />
        <Route path="/HomePages" element={""} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Recuperacion" element={""} />
        <Route path="/Registro" element={<Registro/>} />
        <Route path="/activate/:token" element={""} />
        <Route path="/reset-password/:token" element={""} />
        <Route path="*" element={<Login />} />

        {/* Rutas protegidas */}

        {/* Rutas Admin */}
        <Route path="/HomePagesAdmin" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={""} />
        } />

        {/* Rutas Usuario */}
        <Route path="/HomePage" element={
          <ProtectedRoute allowedRoles={['USER']} element={<HomePage />} />
        } />
        <Route path="/Crear" element={
          <ProtectedRoute allowedRoles={['USER']} element={<Crear/>} />
        } />

        {/* Rutas Secretario */}
        <Route path="/HomePagesSecre" element={
          <ProtectedRoute allowedRoles={['SECRE']} element={""} />
        } />


      </Route>
    </Routes>
  );
};
