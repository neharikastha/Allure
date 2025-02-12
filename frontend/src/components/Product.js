import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { Card } from 'react-bootstrap';
import './Product.css'; // Ensure the path is correct

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded product-card">
            <Link to={`/products/${product._id}`} className="card-img-container">
                <Card.Img src={product.image} alt={product.name} />
            </Link>

            <Card.Body className="card-body-container">
                <Link to={`/products/${product._id}`} className="product-title">
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div" className="product-rating">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                </Card.Text>

                <Card.Text as="h3" className="product-price">
                    Rs {product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
