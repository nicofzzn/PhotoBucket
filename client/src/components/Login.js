import { useContext, useState } from 'react'
import { Card, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { MdFingerprint } from 'react-icons/md'
import { FaGoogle } from 'react-icons/fa'
import { UserContext } from './App'
import axios from 'axios'

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [alert, setAlert] = useState()
  const [user] = useContext(UserContext)

  const handleSignIn = e => {
    e.preventDefault()
    axios
      .post('/auth/local', loginForm)
      .then(res => (window.location = '/'))
      .catch(err => setAlert(err.response.data.message))
  }

  const onInputChange = e => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  if (user.id) {
    return <Redirect to='/' />
  } else {
    return (
      <Container>
        <Row
          className='row justify-content-center'
          style={{ marginTop: '15vh' }}
        >
          <Col xl='5' lg='6' md='8' sm='10' expand='xs'>
            <Card className='p-3' bg='light'>
              <Card.Body>
                <Row className='row justify-content-center'>
                  <LinkContainer to='/' style={{ cursor: 'pointer' }}>
                    <h3 className='font-weight-normal'>
                      <MdFingerprint size='1.5em' /> PhotoBucket
                    </h3>
                  </LinkContainer>
                </Row>
                <Row className='row justify-content-center '>
                  <Card.Subtitle className='mb-2 mt-1 text-muted mb-3'>
                    Sign In
                  </Card.Subtitle>
                </Row>
                <Form>
                  {alert && (
                    <Alert
                      style={{
                        border: 0,
                      }}
                      className='mb-0 p-2 pl-3'
                      variant='danger'
                    >
                      {alert}
                    </Alert>
                  )}
                  <Form.Group>
                    <Form.Control
                      type='email'
                      placeholder='Email'
                      className='mt-2'
                      name='email'
                      value={loginForm.email}
                      onChange={onInputChange}
                    />
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      className='mt-3'
                      name='password'
                      value={loginForm.password}
                      onChange={onInputChange}
                    />
                    <Form.Text className='mt-2'>
                      <Row className='m-0'>
                        <Link to='/'>Forgot password?</Link>
                        <Link
                          style={{ color: '#4b4747' }}
                          className='ml-auto  '
                          to='/signup'
                        >
                          Create an account
                        </Link>
                      </Row>
                    </Form.Text>
                  </Form.Group>
                  <div
                    style={{ borderBottom: '1px solid lightgrey' }}
                    className='mb-3 mt-4'
                  />
                  <Button
                    variant='primary'
                    block
                    className='mb-3'
                    onClick={e => handleSignIn(e)}
                  >
                    Sign In
                  </Button>
                  <Button
                    href='/auth/google'
                    variant='outline-secondary'
                    type='submit'
                    block
                  >
                    <FaGoogle style={{ marginBottom: '2px' }} /> Sign In with
                    Google
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Login
