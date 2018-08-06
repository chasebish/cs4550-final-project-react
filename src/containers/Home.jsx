import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'

import TopArtists from './TopArtists'

import MusicService from '../services/MusicService'

class HomeComponent extends React.Component {

    constructor(props) {
        super(props)
        this.musicService = MusicService.instance
    }

    componentDidMount() {
        this.musicService.getTopArtists()
            .then(artists => this.props.setArtists(artists))
        this.musicService.getTopTracks()
        // .then(tracks => console.log(tracks))
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <Row>
                    <Col md={6} xl={3}>
                        <TopArtists />
                    </Col>
                </Row>
            </div>
        )
    }
}

HomeComponent.propTypes = {
    setArtists: PropTypes.func,
    topArtists: PropTypes.array
}

const mapStateToProps = state => {
    return {
        topArtists: state.topArtists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setArtists: (topArtists) => dispatch({
            type: 'SET_ARTISTS',
            topArtists
        })
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)

export default Home