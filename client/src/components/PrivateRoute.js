import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from './App'

const PrivateRoute = ({ component: Component, loading, ...rest }) => {
  const [user] = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={props =>
        !user.id && !user.loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
