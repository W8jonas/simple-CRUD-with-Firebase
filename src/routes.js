import React from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import {Home} from './pages/Home'

const isAuthenticated = true

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
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
            </Switch>
        </BrowserRouter>
    )
}

