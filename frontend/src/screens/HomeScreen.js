import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Product from '../components/Product';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../actions/productAction';
import './HomeScreen.css';  // Import the new CSS file

function HomeScreen() {
    const dispatch = useDispatch();
    const location = useLocation();
    const keyword = location.search;  // Get query parameters

    const productList = useSelector(state => state.productList);
    const { error, loading, products = [], page, pages } = productList;  // Initialize products as an empty array

    useEffect(() => {
        dispatch(listProducts(keyword));  // Pass keyword to action
    }, [dispatch, keyword]);

    return (
        <div className="home-container">
            <Header />
            <ProductCarousel />
            <div className="home-header">
                <h1 className="home-title">Latest Outfit</h1>
            </div>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                : <div className="product-list-row">
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="product-item">
                                <div className="product-card">
                                    <Product product={product} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>}
            <div className="pagination-container">
                <Paginate page={page} pages={pages} keyword={keyword} />
            </div>
        </div>
    );
}

export default HomeScreen;
