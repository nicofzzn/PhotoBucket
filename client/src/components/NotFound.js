import React from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const NotFound = () => {
  let location = useLocation()

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return <></>
  } else {
    return (
      <Container className='p-5'>
        <Helmet>
          <title>Page not found | PhotoBucket</title>
        </Helmet>
        <h1 className='font-weight-light'>{location.pathname}</h1>
        <h3 className='font-weight-normal'>Page not found</h3>
      </Container>
    )
  }
}

export default NotFound
