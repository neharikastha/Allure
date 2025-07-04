import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './ProductScreen.css'; // Import the new CSS file
import { listProductDetails, createProductReview } from '../actions/productAction';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

function ProductScreen() {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const { success: successProductReview, error: errorProductReview, loading: loadingProductReview } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(id));
    }, [dispatch, id, successProductReview]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview({ rating, comment }));
    };

    return (
        <div className="product-container">
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <div className="product-row">
                        {/* Image on the Top Left */}
                        <div className="product-image">
                            <Image src={product.image} alt={product.name} fluid />
                        </div>
    
                        {/* Product Details on the Right */}
                        <div className="product-info">
                            <Card className='card-prod'>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                    <Card.Text className='mt-3'><strong>Price:</strong> Rs {product.price}</Card.Text>
                                    <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
                                    <ListGroup variant='flush' className='box'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                            </Row>
                                        </ListGroup.Item>
    
                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
    
                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className='btn-block'
                                                disabled={product.countInStock === 0}
                                                type='button'>
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
    
                    {/* Rating & Review Section at Bottom Left */}
                    <div className="reviews-section">
                        <h2>Write a Review</h2>
                        {successProductReview && <Message variant="success">Review submitted successfully</Message>}
                        {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                        {userInfo ? (
                            <Form onSubmit={submitHandler} className="review-form">
                                <Form.Group controlId="rating">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
    
                                <Form.Group controlId="comment">
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        row="3"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
    
                                <Button type="submit" variant="success">
                                    Submit
                                </Button>
                            </Form>
                        ) : (
                            <Message>Please <Link to="/login">sign in</Link> to write a review</Message>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductScreen;
