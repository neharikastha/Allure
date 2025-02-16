import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen() {
    const { id: productId } = useParams() // Get the product ID from the URL

    // Set up local state for form fields
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Access product details from Redux store
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    // Access product update status from Redux store
    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist') // Navigate to the product list after successful update
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId)) // Fetch product details if not already loaded
            } else {
                // Prefill the form with existing product data
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, productId, product, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)
            setImage(data) // Assuming the response returns the image URL
            setUploading(false)

        } catch (error) {
            setUploading(false)
            // Handle error (e.g., show an error message)
        }
    }

    // Show loading state while fetching data
    if (loading) {
        return <Loader />
    }

    // Show error if product data couldn't be fetched
    if (error) {
        return <Message variant='danger'>{error}</Message>
    }

    return (
        <div>
            <Link to='/admin/productlist'>Go Back</Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            value={name || ''} // Prefill value with the existing product data
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            value={price || ''} // Prefill value with the existing product data
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            value={image || ''} // Prefill value with the existing product data
                            onChange={(e) => setImage(e.target.value)}
                        />

                        <Form.Control
                            id='image-file'
                            type='file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        />
                        {uploading && <Loader />}
                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type='text'
                            value={brand || ''} // Prefill value with the existing product data
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='countinstock'>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type='number'
                            value={countInStock || ''} // Prefill value with the existing product data
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            value={category || ''} // Prefill value with the existing product data
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            value={description || ''} // Prefill value with the existing product data
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
