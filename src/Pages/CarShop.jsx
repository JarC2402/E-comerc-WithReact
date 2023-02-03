import { useState, useEffect } from 'react'
import axios from "axios";
import getConfig from   '../utils/getConfig';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const CarShop = () => {
    const [purchases, setPurchases] = useState([])

    useEffect (() => {
        axios
        .get ('https://e-commerce-api.academlo.tech/api/v1/purchases', getConfig())
        .then(resp => setPurchases(resp.data.data.purchases))
        .catch((error) => console.error(error))
    }, [])

    return(
        <div className="CarShop">            
            <h2>Productos Comprados</h2>
            
            <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
           
            {purchases.map((item) => {
        return item.cart.products?.map((item) =>
        <ListGroup.Item variant='dark' key={item.title}>{item.title}</ListGroup.Item>
        
        
        );       
      })}
      
     
        
      
      </ListGroup>
    </Card>
        </div>
    )
}

export default CarShop