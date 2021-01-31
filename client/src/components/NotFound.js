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
        <h3 className='font-weight-light'>Can't find {location.pathname}</h3>
      </Container>
    )
  }
}

export default NotFound
