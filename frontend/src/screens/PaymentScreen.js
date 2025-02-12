import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import './PaymentScreen.css'; // Import the new CSS file
import Header from '../components/Header';

function PaymentScreen() {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('eSewa');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const handleDummyPayment = () => {
        setTimeout(() => {
            setPaymentSuccess(true);
            setTimeout(() => {
                navigate('/placeorder');
            }, 2000);
        }, 1500);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        handleDummyPayment();
    };

    return (
        <div>
        <Header/>
        <FormContainer>
            <div className="payment-screen-container">
                <h1>Payment Method</h1>
                {error && <Alert variant="danger" className="payment-alert">{error}</Alert>}
                {paymentSuccess && <Alert variant="success" className="payment-alert">Payment Successful! Redirecting...</Alert>}

                <Form onSubmit={submitHandler}>
                    <Form.Group className="payment-form-group">
                        <Form.Label className="payment-form-label" as="legend">Select Payment Method</Form.Label>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="eSewa"
                                id="esewa"
                                name="paymentMethod"
                                value="eSewa"
                                checked={paymentMethod === 'eSewa'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="payment-radio-input"
                            />
                        </Col>
                    </Form.Group>

                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="payment-submit-button" 
                        disabled={paymentSuccess}
                    >
                        {paymentSuccess ? 'Processing...' : 'Continue to Payment'}
                    </Button>
                </Form>
            </div>
        </FormContainer>
        </div>
    );
}

export default PaymentScreen;
