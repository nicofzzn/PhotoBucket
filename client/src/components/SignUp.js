import { useContext, useState } from 'react'
import { Card, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { MdFingerprint } from 'react-icons/md'
import { UserContext } from './App'
import axios from 'axios'

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [alert, setAlert] = useState({ variant: '', message: '' })
  const [user] = useContext(UserContext)

  const handleSignUn = e => {
    e.preventDefault()
    axios
      .post('/api/user', signUpForm)
      .then(res =>
        setAlert({
          variant: 'success',
          message: res.data,
        })
      )
      .catch(err =>
        setAlert({
          variant: 'danger',
          message: err.response.data,
        })
      )
  }

  const onInputChange = e => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value })
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
                    Sign Up
                  </Card.Subtitle>
                </Row>
                <Form>
                  {alert.message && (
                    <Alert
                      style={{
                        border: 0,
                      }}
                      className='mb-0 p-2 pl-3'
                      variant={alert.variant}
                    >
                      {alert.message}
                    </Alert>
                  )}
                  <Form.Group>
                    <Form.Control
                      type='text'
                      placeholder='Name'
                      className='mt-2'
                      name='name'
                      value={signUpForm.name}
                      onChange={onInputChange}
                    />
                    <Form.Control
                      type='email'
                      placeholder='Email'
                      className='mt-2'
                      name='email'
                      value={signUpForm.email}
                      onChange={onInputChange}
                    />
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      className='mt-2'
                      name='password'
                      value={signUpForm.password}
                      onChange={onInputChange}
                    />
                    <Form.Control
                      type='password'
                      placeholder='Retype-password'
                      className='mt-2'
                      name='passwordConfirm'
                      value={signUpForm.passwordConfirm}
                      onChange={onInputChange}
                    />
                    <Form.Text className='mt-2'>
                      <Row className='m-0'>
                        <Link
                          style={{ color: '#4b4747' }}
                          className='ml-auto  '
                          to='/login'
                        >
                          I already have an account
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
                    onClick={e => handleSignUn(e)}
                  >
                    Sign In
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

export default SignUp
