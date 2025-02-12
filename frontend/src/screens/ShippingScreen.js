import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import './ShippingScreen.css'; // Import the new CSS file
import Header from '../components/Header'

function ShippingScreen() { 

    const cart = useSelector(state => state.cart) || {};
    const { shippingAddress = { } } = cart;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    }
    
    return (
        <div>
        <Header/>
        <FormContainer>
            <div className="shipping-screen-container">
                <h1>Shipping</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="address" className="shipping-form-group">
                        <Form.Label className="shipping-form-label">Enter Address</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="shipping-form-control"
                        />
                    </Form.Group>

                    <Form.Group controlId="city" className="shipping-form-group">
                        <Form.Label className="shipping-form-label">City</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="shipping-form-control"
                        />
                    </Form.Group>

                    <Form.Group controlId="postalCode" className="shipping-form-group">
                        <Form.Label className="shipping-form-label">Postal Code</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter Postal Code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="shipping-form-control"
                        />
                    </Form.Group>

                    <Form.Group controlId="country" className="shipping-form-group">
                        <Form.Label className="shipping-form-label">Country</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="shipping-form-control"
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="shipping-form-submit-button">
                        Continue
                    </Button>
                </Form>
            </div>
        </FormContainer>
        </div>
    );
}

export default ShippingScreen;
