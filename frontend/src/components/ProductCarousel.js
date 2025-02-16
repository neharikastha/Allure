import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import './ProductCarousel.css'  // Import custom CSS file

// Import images from the assets/images folder
import productImage1 from '../assets/images/c1.png'
import productImage2 from '../assets/images/c2.png'
import productImage3 from '../assets/images/c3.jpg'

function ProductCarousel() {
    return (
        <Carousel pause='hover' className='bg-light product-carousel'>
            <Carousel.Item>
                <Image 
                    src={productImage1} 
                    alt="Product 1" 
                    fluid 
                    className="carousel-image" 
                />
                <Carousel.Caption className='carousel-caption'>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <Image 
                    src={productImage2} 
                    alt="Product 2" 
                    fluid 
                    className="carousel-image" 
                />
                <Carousel.Caption className='carousel-caption'>
                    {/* <h5 className='carousel-title'>Product 2</h5> */}
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <Image 
                    src={productImage3} 
                    alt="Product 3" 
                    fluid 
                    className="carousel-image" 
                />
                <Carousel.Caption className='carousel-caption'>
                    {/* <h5 className='carousel-title'>Product 3</h5> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default ProductCarousel
