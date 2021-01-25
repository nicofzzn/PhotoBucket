import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Row, Spinner } from 'react-bootstrap'
import axios from 'axios'

// components
import PrivateRoute from './PrivateRoute'
import Test from './Test'
import Header from './Header'
import Sidebar from './Sidebar'
import Login from './Login'
import Dashboard from './Dashboard'
import NotFound from './NotFound'

export const UserContext = React.createContext()
const App = () => {
  const [user, setUser] = useState({ loading: true })

  useEffect(() => {
    ;(function () {
      axios
        .get('/api/user')
        .then(res => {
          setUser({ loading: false, ...res.data })
        })
        .catch(err => {
          setUser({ loading: false })
          console.error(err)
        })
    })()
  }, [])

  return (
    <Router>
      <UserContext.Provider value={[user, setUser]}>
        {user.loading ? (
          <Container style={{ marginTop: '40vh', height: '100vh' }}>
            <Row className='justify-content-md-center'>
              <Spinner
                style={{ width: '4rem', height: '4rem' }}
                animation='border'
                variant='secondary'
                role='status'
              >
                <span className='sr-only'>Loading...</span>
              </Spinner>
            </Row>
          </Container>
        ) : (
          <>
            <Switch>
              <Route exact path='/Login' component={Login} />
              <Header path='/' />
            </Switch>
            <Sidebar />
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute exact path='/test' component={Test} />
              <Route path='*' component={NotFound} />
            </Switch>
          </>
        )}
      </UserContext.Provider>
    </Router>
  )
}

export default App
