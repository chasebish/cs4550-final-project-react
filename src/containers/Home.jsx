import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { TopArtists, TopTracks } from '../components'
import { MusicService } from '../services'
import { artistActions, trackActions } from '../constants'

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
                <div className='row'>
                    <div className='col-md-6 col-xl-3'>
                        <TopArtists />
                    </div>
                    <div className='col-md-6 col-xl-3'>
                        <TopTracks />
                    </div>
                </div>
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
        setArtists: (topArtists) => dispatch({ type: artistActions.SET_ARTISTS, topArtists }),

        setTracks: (topTracks) => dispatch({ type: trackActions.SET_TRACKS, topTracks })
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)

export default Home