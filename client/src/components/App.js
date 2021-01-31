import React, { useState, useEffect } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Row, Spinner } from 'react-bootstrap'
import axios from 'axios'

// components
import PrivateRoute from './PrivateRoute'
import Header from './Header'
import Sidebar from './Sidebar'
import Login from './Login'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import NotFound from './NotFound'

export const UserContext = React.createContext()
export const FoldersContext = React.createContext()
const App = () => {
  const [user, setUser] = useState({ loading: true })
  const [folders, setFolders] = useState([])

  useEffect(() => {
    axios
      .get('/api/user')
      .then(res => {
        setUser({ loading: false, ...res.data })
      })
      .catch(err => {
        setUser({ loading: false })
        console.error(err)
      })

    axios
      .get('/api/folders')
      .then(res => setFolders(res.data))
      .catch(err => console.error(err.message))

    if (window.location.pathname === '/') {
      window.location = '/dashboard'
    }
  }, [])

  return (
    <Router>
      <UserContext.Provider value={[user, setUser]}>
        {user.loading ? (
          <Container style={{ marginTop: '40vh', height: '100vh' }}>
            <Row className='justify-content-center'>
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
              <Route exact path='/login' component={Login} />
              <Route exact path='/signUp' component={SignUp} />
              <Header path='/' />
            </Switch>
            <Route path='/dashboard'>
              <Sidebar />
            </Route>
            <Switch>
              {/* <PrivateRoute path='/dashboard'>
                <Dashboard folders={folders} setFolders={setFolders} />
              </PrivateRoute> */}
              <PrivateRoute
                path='/dashboard'
                childProps={{ folders, setFolders }}
                component={Dashboard}
              />
              <Route path='*' component={NotFound} />
            </Switch>
          </>
        )}
      </UserContext.Provider>
    </Router>
  )
}

export default App
