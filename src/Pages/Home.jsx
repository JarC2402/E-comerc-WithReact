import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProductsThunk, categoryThunk } from '../Store/Slices/Products.slice'
import { Row, Col, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from "axios";


const Home = () => {
    const dispatch = useDispatch();
    const Products = useSelector( (state) => state.Products);
    const [categories, setCategories] = useState ([]);

    useEffect (() => {
        dispatch(getProductsThunk()),
        axios
        .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
        .then(resp => setCategories(resp.data.data.categories))
        .catch((error) => console.error(error))

    }, [dispatch]) /*en tu codigo habia aqui un:  dispatch*/// esta logica es para traer la info de la api(se conbina con acciones en el products.slice y index)



    return(
        <div className="Home">
            <h2>Home</h2>
            <div className="Home_container">
            <div className="filter_Area">
                <h2>Categoria</h2>
                <hr/>
            {
                categories.map(category => (
                    <Button 
                    key={category.id}
                    variant="primary"
                    onClick={() => dispatch(categoryThunk(category.id))}
                    >{category.name}</Button>
                    
                ))                
            }
            <br/>
            <Button
            variant="dark"
            onClick={() => dispatch(getProductsThunk())}
            >Rest. Filtro</Button>
            </div>
            <div className="product_container">
                
            <Row xs={1} md={2} lg={3} > {/* con esto haces que dependiendo de la resolucion muestre 1 o 3 img (responsivo) */}
                
                {
                    Products?.map(productItem => (
                <Col  key={productItem.id}>{/* con esto traes la info de la appi individualmente para que queda tarjeta tenga la info de cada producto */}
                <Card className="product_card" >
                <div className="image"><Card.Img variant="top" src={productItem.productImgs[0]} /></div>
                <Card.Body className="card_info">
                    <Card.Title>{productItem.title}</Card.Title>
                    <Card.Text>
                   
                    </Card.Text>
                    
                    <Link to={`/Product/${productItem.id}`}> <Button varian="primary">Detail</Button></Link>
                </Card.Body>
                </Card>
                </Col>
                ))
            }
            </Row>
            </div>
            </div>
        </div>
    )
}

export default Home