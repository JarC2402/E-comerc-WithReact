import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from "axios";
import getConfig from   '../utils/getConfig';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';


const SideBar = ({show, handleClose}) => {
   const [car, setCar] = useState([])
    useEffect(() => {
        axios
        .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
        .then((resp) => setCar(resp.data.data.cart.products))
        .catch(error => console.error(error)) 
        
    }, [show])

const buyCart = () => {
 axios
 .post('https://e-commerce-api.academlo.tech/api/v1/purchases',
 {
    "street": "Green St. 1456",
    "colony": "Southwest",
    "zipCode": 12345,
    "city": "USA",
    "references": "Some references"
},
getConfig()
)
.then(resp => setCar([])) 
.catch(error => console.error(error))
}

console.log(car)

    return(
        <div>
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
         {   car  ? 
             car.map(cartP => 
              <div className="cart_container">
             
              <h5></h5>
                <Card>
        <Card.Header>
            <Nav variant="pills" defaultActiveKey="#first">            
            <Nav.Item>
                <Nav.Link key={car.id} >{cartP.title}</Nav.Link>
            </Nav.Item>            
            </Nav>
        </Card.Header>
        <Card.Body>
            <Card.Title>Cantidad: {cartP.productsInCart.quantity}</Card.Title>
            <Card.Title>Precio: {cartP.price}</Card.Title>            
            
        </Card.Body>
        </Card>
              </div>
              )
           : 
           <h2>No hay productos seleccionados</h2>
        }
           
        <hr/>
        <Button 
        onClick={buyCart}
        disabled={car.length == 0}
        >Buy</Button>
        </Offcanvas.Body>
      </Offcanvas>
        </div>
    )
}

export default SideBar