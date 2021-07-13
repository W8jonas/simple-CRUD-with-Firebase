import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Admin } from './pages/Admin'
import { Auth } from './pages/Auth'
import {Home} from './pages/Home'

const isAuthenticated = false

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/auth", state: { from: props.location } }} />
                )
            }
         />
    )
}


export function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/auth" component={Auth} />
                <PrivateRoute path="/admin" component={Admin} />
            </Switch>
        </BrowserRouter>
    )
}

