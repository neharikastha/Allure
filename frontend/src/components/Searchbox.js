import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate(window.location.pathname)  // Reload same page if no keyword
        }
    }

    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
                type='text'
                name='q'
                placeholder='Search Products...'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
                // defaultValue={keyword}
            ></Form.Control>
            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox
