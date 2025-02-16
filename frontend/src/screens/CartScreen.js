import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Header from '../components/Header';
import './CartScreen.css'; // Import the new CSS file

function CartScreen() {
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems = [] } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    console.log(("Cart items:", cartItems));
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <div>
      <Header />
      <div className="cart-container">
        <Row>
          <Col md={8}>
            <div className="cart-header">
              <h1>Shopping Cart</h1>
            </div>
            {cartItems.length === 0 ? (
              <Message variant="info" className="cart-empty-message">
                Your cart is empty <Link to="/"> Go back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.product} className="cart-item">
                    <Row className="cart-item-info">
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3} className="cart-item-details">
                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>Rs {item.price}</Col>
                      <Col md={3}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(addToCart(item.product, Number(e.target.value)))
                          }
                        >
                          {[...Array(Math.max(0, item.countInStock || 0)).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}

                        </Form.Control>
                      </Col>
                      <Col md={1} className="cart-item-remove">
                        <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card className="cart-summary">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                    Rs {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block cart-checkout-button"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CartScreen;