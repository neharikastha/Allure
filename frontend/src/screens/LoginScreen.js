import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import loginBackground from '../assets/images/login.jpg';
import './LoginScreen.css'; // Import the CSS file

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const redirect = new URLSearchParams(location.search).get('redirect') || '/';

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${loginBackground})` }}>
            <Card className="login-card">
                <Card.Body>
                    <h1 className="login-title">Log In</h1>
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="email" className="form-group">
                            <Form.Label className="form-label">Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="form-group">
                            <Form.Label className="form-label">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="submit-button">
                            Log In
                        </Button>
                    </Form>

                    <Row className="py-3">
                        <Col className="register-link">
                            New Customer?{' '}
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                Register
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default LoginScreen;
