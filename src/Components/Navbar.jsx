// aca pegas lo que necesites de la pag de boostrap incluyendo las importaciones que aparezcan 
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import SideBar from './SideBar';
import { useState, useEffect } from "react";

const NavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return(
        <div className="Home_nav">
            <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link as={ Link } to="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={ Link } to="/Login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={ Link } to="/Product/:id">ProductDetail</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={ Link } to="/CarShop">Purchases</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={handleShow} >CarShop</Nav.Link>
      </Nav.Item>
    </Nav>
    <SideBar
    show={show}
    handleClose={handleClose}
    />
        </div>
       
    )
}

export default NavBar