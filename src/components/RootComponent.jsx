import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from '../containers'
import { Navbar } from '.'

const RootComponent = () => (
    <BrowserRouter>
        <div>
            <Navbar />
            <div className='container-fluid'>
                <Switch>
                    <Route exact path='/' component={Home} />
                    {/* <Route exact path='/toptracks' component={CourseList} />
                    <Route path="/course/:courseId/" component={CourseEditor} />
                    <Route path="/course/:courseId/module/:moduleId" component={ModuleEditor} /> */}
                </Switch>
            </div>
        </div>
    </BrowserRouter>
)

export default RootComponent