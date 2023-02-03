import { useParams, useNavigate } from "react-router-dom" // esto lo importas para saber q product fue seleccionado en el home
import { useState, useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../Store/Slices/isLoading.slice";
import { categoryThunk } from "../Store/Slices/Products.slice";
import { createCarThunk } from "../Store/Slices/Car.slice";
import { Row, Col, Button, Card } from "react-bootstrap"
import Carousel from 'react-bootstrap/Carousel';





const ProductDetail = () => {
    const {id} = useParams()
    const [detail, setDetail] = useState({});
    const dispatch = useDispatch()
    // const productRelated = useSelector(state => state.product)
    const [add, setAdd] = useState(1)
    const navigate = useNavigate();
    const allProducts = useSelector(state => state.products)
    const [productRelated, setProductRelated] = useState([])

    
    useEffect (() => {
        dispatch(setIsLoading(true))
        axios
        .get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}`)
        .then(resp => {setDetail(resp.data.data.product)
             }
        // console.log(allProducts.filter(productss => productss.category.name == resp.data.data.product.category))
         //dispatch(categoryThunk(detail?.category?.id)))
        ).catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
        
        
    }, [id])

    // 

    const addToCart = () => {
        const token = localStorage.getItem("token");
        
        if (token){
        const product ={
        id : detail.id,
        quantity : Number(add)
        }
        dispatch (createCarThunk(product))
         }else{
            navigate("/login");
         }
       
       
    }
 

    return(
        <div className="ProductDetail">
            <div>
            <h2>{detail.title}</h2>
            <h3>{detail.price}</h3>
            <p>{detail.status}</p>
            <p>{detail.description}</p> 
            <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.productImgs?.[0]}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.productImgs?.[1]}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={detail.productImgs?.[2]}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <img />
           </div>   
           <div className="add_toCar">
           <Button className="button1" varian onClick={addToCart}>Agregar al carro de compras</Button>
            <Button onClick={() => setAdd(add - 1) }>-</Button>
            <Button variant="dark" type='text'>{add}</Button>
            <Button onClick={() => setAdd(add + 1) }>+</Button>
           </div>
           <br/>

            
         </div>
    )
}

export default ProductDetail