import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { getOrderDetails, deliverOrder } from '../actions/orderActions';
import { ORDER_DELIVER_RESET } from '../constants/orderConstants';
import './OrderScreen.css'; // Import the custom CSS file
import Header from '../components/Header';

function OrderScreen() {
    const { id: orderId } = useParams(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { success: successDeliver } = orderDeliver;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }

        if (!order || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, order, orderId, successDeliver, navigate, userInfo]);

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return (
        <div>
        <Header/>
        <div className="order-container">
            <h1>Order: {order?._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush" className="shipping-section">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order?.user?.name}</p>
                            <p><strong>Email: </strong>
                                <a href={`mailto:${order?.user?.email}`}>{order?.user?.email}</a>
                            </p>
                            <p><strong>Address: </strong>
                                {order?.shippingAddress?.address}, {order?.shippingAddress?.city}, 
                                {order?.shippingAddress?.postalCode}, {order?.shippingAddress?.country}
                            </p>
                            {order?.isDelivered ? (
                                <Message variant="success">Delivered on {order?.deliveredAt}</Message>
                            ) : (
                                <Message variant="warning">Not Delivered</Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup variant="flush" className="order-items-section">
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order?.orderItems?.length === 0 ? (
                                <Message variant="info">Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order?.orderItems?.map((item, index) => (
                                        <ListGroup.Item key={index} className="order-item">
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`} className="order-item-name">{item.name}</Link>
                                                </Col>
                                                <Col md={4} className="order-item-price">
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
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
                    <Card>
                        <ListGroup variant="flush" className="order-summary-section">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>Rs {order?.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>Rs {order?.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>Rs {order?.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>Rs {order?.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {userInfo?.isAdmin && order?.isPaid && !order?.isDelivered && (
                                <ListGroup.Item>
                                    <Button type="button" className="button-deliver" onClick={deliverHandler}>
                                        Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
        </div>
    );
}

export default OrderScreen;
