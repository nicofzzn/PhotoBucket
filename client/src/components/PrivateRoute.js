import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from './App'

const PrivateRoute = ({ component: Component, childProps, ...rest }) => {
  const [user] = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={() =>
        !user.id && !user.loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...childProps} />
        )
      }
    />
  )
}

export default PrivateRoute
