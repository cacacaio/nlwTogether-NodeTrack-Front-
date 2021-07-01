import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'
import { Login } from './pages/Login'
import React from 'react'
import { Tags } from './pages/Tags'
import { isAuth } from './services/auth'

const PrivateRoute = ({
  component: Component,
  path,
}: {
  component: any
  path: string
}) => {
  return (
    <Route
      {...path}
      render={(props) =>
        isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export function Routes() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute component={Tags} path="/Tags"></PrivateRoute>
          <Route exact path="/" component={Login}></Route>
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  )
}
