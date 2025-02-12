import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './ProfileScreen.css';  // Import the CSS file
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin || {});
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile || {});
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, navigate, user, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserProfile({ 
                'id' : user._id, 
                'name' : name, 
                'email' : email, 
                'password' : password
            }))
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
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
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="submit-button">
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Order</h2>
            </Col>
        </Row>
    );
}

export default ProfileScreen;
