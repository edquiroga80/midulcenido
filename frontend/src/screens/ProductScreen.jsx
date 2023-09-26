import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { Rating } from "../components/Rating";
// import products from "../products";
import axios from "axios";
import '../index.css';

export const ProductScreen = () => {
  const [product, setProduct] = useState({});

  const { id: productId } = useParams();
  
  useEffect(()=>{
   const fetchProduct = async () =>{
    const {data} = await axios.get(`/api/products/${productId}`);
    setProduct(data);
   }
   fetchProduct();
  },[productId]);

  return (
    <>
      <Link className="btn btn-custom my-3" to="/">
        Volver al Inicio
      </Link>
      <Row>
        <Col md={5}>
          <Image
            src={product.image}
            alt={product.name}
            fluid={true.toString()}
          />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews}`} />
            </ListGroup.Item>
            <ListGroup.Item>Precio: ${product.price}</ListGroup.Item>
            <ListGroupItem>
                Descripción: {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Precio: </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Stock: </Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? 'en Stock' : 'sin Stock'}</strong>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button 
                className="btn-block btn-warning"
                type="button"
                disabled={product.countInStock === 0}>
                    Agrega al Carrito

                </Button>
              </ListGroupItem>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default ProductScreen;
