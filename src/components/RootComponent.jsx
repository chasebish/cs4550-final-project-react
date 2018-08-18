import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home, Login, Register } from '../containers'
import { Navbar } from '.'

const RootComponent = () => (
    <BrowserRouter>
        <div>
            <Navbar />
            <div className='container'>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                </Switch>
            </div>
        </div>
    </BrowserRouter>
)

export default RootComponent