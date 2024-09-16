import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../router/ProtectedRoute';
import  Login  from '../src/Menus/Login';
import { Navbar } from '../Navbar';
import  {HomePage, HomePageAdmin } from '../src/componentes/Menu/HomePage';
import Crear from '../src/Menus/User/Crear';
import Registro from '../src/Menus/Registro';
import Consultar from '../src/Menus/User/Consultar';
import GestionUsuario from '../src/Menus/Admin/GestionUsuario';
import GestionCategoria from '../src/Menus/Admin/GestionCategoria';
import GestionDependencia from '../src/Menus/Admin/GestionDependencia';
import Dashboard from '../src/Menus/Admin/Dashboard';
import CrearCategoria from '../src/Menus/Admin/CrearCategoria';
import CrearDependencias from '../src/Menus/Admin/CrearDependencias';
import CrearUsuario from '../src/Menus/Admin/CrearUsuario';


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
          <ProtectedRoute allowedRoles={['ADMIN']} element={<HomePageAdmin />} />
        } />
        <Route path="/Dashboard" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<Dashboard />} />
        } />
        <Route path="/GestionUsuario" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<GestionUsuario />} />
        } />
        <Route path="/GestionCategoria" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<GestionCategoria />} />
        } />
        <Route path="/GestionDependencia" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<GestionDependencia />} />
        } />
        <Route path="/CrearUsuario" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<CrearUsuario />} />
        } />
        <Route path="/CrearCategoria" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<CrearCategoria />} />
        } />
        <Route path="/CrearDependencias" element={
          <ProtectedRoute allowedRoles={['ADMIN']} element={<CrearDependencias />} />
        } />

        {/* Rutas Usuario */}
        <Route path="/HomePage" element={
          <ProtectedRoute allowedRoles={['USER']} element={<HomePage />} />
        } />
        <Route path="/Crear" element={
          <ProtectedRoute allowedRoles={['USER']} element={<Crear/>} />
        } />
        <Route path="/Consultar" element={
          <ProtectedRoute allowedRoles={['USER']} element={<Consultar/>} />
        } />

        {/* Rutas Secretario */}
        <Route path="/HomePagesSecre" element={
          <ProtectedRoute allowedRoles={['SECRE']} element={""} />
        } />


      </Route>
    </Routes>
  );
};
