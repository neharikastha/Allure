import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './RegisterScreen.css'; // Import the CSS file

function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();

    const redirect = new URLSearchParams(location.search).get('redirect') || '/';

    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <div className="register-container">
            <Card className="register-card">
                <Card.Body>
                    <h1 className="register-title">Register</h1>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" className="form-group">
                            <Form.Label className="form-label">Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                            />
                        </Form.Group>

                        <Form.Group controlId="email" className="form-group">
                            <Form.Label className="form-label">Email Address</Form.Label>
                            <Form.Control
                                required
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
                                required
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                            />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword" className="form-group">
                            <Form.Label className="form-label">Confirm Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control"
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="submit-button">
                            Register
                        </Button>
                    </Form>

                    <Row className="py-3">
                        <Col className="login-link">
                            Have an Account?{' '}
                            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                                Log In
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default RegisterScreen;