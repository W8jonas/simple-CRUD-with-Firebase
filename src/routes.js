import React, { useState } from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Admin } from './pages/Admin'
import { Auth } from './pages/Auth'
import {Home} from './pages/Home'
import { auth } from './services/firebase'


function PrivateRoute({ component: Component, authState, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                authState ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/auth", state: { from: props.location } }} />
                )
            }
         />
    )
}


export function Routes() {
    const [authUser, setAuthUser] = useState(false)

    auth.onAuthStateChanged((user) => {
        if (user) {
            setAuthUser(true)
        } else {
            setAuthUser(false)
        }
    })

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/auth" component={Auth} />
                <PrivateRoute authState={authUser} path="/admin" component={Admin} />
            </Switch>
        </BrowserRouter>
    )
}

