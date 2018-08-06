import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'

import { Home } from '../containers'
import { Navbar } from '.'

const RootComponent = () => (
    <BrowserRouter>
        <div>
            <Navbar />
            <Container fluid={true}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    {/* <Route exact path='/toptracks' component={CourseList} />
                    <Route path="/course/:courseId/" component={CourseEditor} />
                    <Route path="/course/:courseId/module/:moduleId" component={ModuleEditor} /> */}
                </Switch>
            </Container>
        </div>
    </BrowserRouter>
)

export default RootComponent