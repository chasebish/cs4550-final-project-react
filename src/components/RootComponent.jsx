import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Home, Login, Register, ArtistRegister, AddSong, Profile, SongClass, Search } from '../containers'
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
                    <Route exact path='/register/artist' component={ArtistRegister} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/addsong' component={AddSong} />
                    <Route path='/song/:artist/:track' component={SongClass} />
                    <Route exact path='/search' render={() => (<Redirect to="/" />)} />
                    <Route exact path='/search/:query' component={Search} />
                </Switch>
            </div>
        </div>
    </BrowserRouter>
)

export default RootComponent