import { useState } from 'react'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import CarShop from './Pages/CarShop'
import ProductDetail from './Pages/ProductDetail'
import NavBar from './Components/Navbar'
import Loader from './Components/Loader'
import Container from 'react-bootstrap/Container';
import { useSelector } from "react-redux";
import ProtectedRoutes from './Components/ProtectedRoutes'

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      {/* entre el HashRouter y Routes vas a colocar lo que quieres que sea en toda la web ind de la pag que este el usuario*/}
      <NavBar/>
      {isLoading && <Loader />}
      <Container className='my-5'>
      <Routes>
        <Route path="/" element={<Home/>}
        />
        
        <Route path="/Login" element={<Login/>}
        />
        <Route element={<ProtectedRoutes/>}>
        <Route path="/CarShop" element={<CarShop/>}
        />
        <Route path="/Product/:id" element={<ProductDetail/>}
        />
        </Route>
       
      </Routes>
      </Container>
    </HashRouter>
  )
}

export default App


/* 
- el los productos relacionados funcionen el product detail
- que el token sea valido

*/