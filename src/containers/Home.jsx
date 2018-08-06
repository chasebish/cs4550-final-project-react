import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'

import TopArtists from './TopArtists'
import TopTracks from './TopTracks'

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
            .then(tracks => this.props.setTracks(tracks))
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <Row>
                    <Col md={6} xl={3}>
                        <TopArtists />
                    </Col>
                    <Col md={6} xl={3}>
                        <TopTracks />
                    </Col>
                </Row>
            </div>
        )
    }
}

HomeComponent.propTypes = {
    setArtists: PropTypes.func,
    setTracks: PropTypes.func,
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
        }),

        setTracks: (topTracks) => dispatch({
            type: 'SET_TRACKS',
            topTracks
        })
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)

export default Home