import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import './PlaceOrderScreen.css'; // Import the new CSS file
import Header from '../components/Header';

function PlaceOrderScreen({ }) {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    console.log("Selected Payment Method:", cart.paymentMethod); // Debugging

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 5000 ? 0 : 100).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success])

    const placeOrder = async () => {
        try {
            await dispatch(createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }));
        } catch (error) {
            console.error('Order creation failed:', error);
        }
    };

    return (
        <div>
        <Header/>
        <div className="place-order-container">
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush' className="place-order-shipping">
                        <ListGroup.Item>
                            <h2 className="place-order-heading">Shipping</h2>

                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address},  {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup variant='flush' className="place-order-payment">
                        <ListGroup.Item>
                            <h2 className="place-order-heading">Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup variant='flush' className="place-order-items">
                        <ListGroup.Item>
                            <h2 className="place-order-heading">Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Your cart is empty
                            </Message> : (
                                <ListGroup variant='flush' className="place-order-item-list">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index} className="place-order-item">
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`} className="place-order-item-name">{item.name}</Link>
                                                </Col>

                                                <Col md={4} className="place-order-item-price">
                                                    {item.qty} X Rs {item.price} = Rs {(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card className="place-order-summary-card">
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2 className="place-order-summary-title">Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item className="place-order-summary-row">
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>Rs {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className="place-order-summary-row">
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>Rs {cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className="place-order-summary-row">
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>Rs {cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className="place-order-summary-row">
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>Rs {cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className="place-order-error-message">
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className="place-order-button"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
        </div>
    )
}

export default PlaceOrderScreen;
