import React from 'react'
import { Container } from 'reactstrap'

import Navbar from './Navbar'

const RootComponent = () => (
    <div>
        <Navbar />
        <Container fluid={true}>
            <h1>Hello World</h1>
        </Container>
    </div>
)

export default RootComponent