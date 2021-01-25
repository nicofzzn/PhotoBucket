import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from './App'

function PrivateRoutes({ children, ...rest }) {
  let user = useContext(UserContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.id && !user.loading ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoutes
