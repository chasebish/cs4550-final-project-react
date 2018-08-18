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
                <h1 className='display-4'>aMused</h1>
                <div className='row'>
                    <div className='col-xl-6'>
                        <h1>USER FEEEED</h1>
                    </div>
                    <div className='col-xl-6 mt-5 mt-xl-0'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <TopArtists />
                            </div>
                            <div className='col-md-6 mt-3 mt-md-0'>
                                <TopTracks />
                            </div>
                        </div>
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