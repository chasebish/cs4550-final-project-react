import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { TopArtists, TopTracks } from '../components'
import { MusicService } from '../services'
import { artistActions, trackActions } from '../constants'

import { UserService } from '../services'
import ReviewFeed from './ReviewFeed';

class HomeComponent extends React.Component {

    constructor(props) {
        super(props)
        this.musicService = MusicService.instance
        this.userService = UserService.instance
    }

    componentDidMount() {
        this.musicService.getTopArtists()
            .then(artists => {
                this.props.setArtists(artists)
            })
        this.musicService.getTopTracks()
            .then(tracks => {
                this.props.setTracks(tracks)
            })
    }

    addNewArtists = artist => {
        console.log('add', artist)
    }

    addNewTracks = tracks => {
        console.log('add', tracks)
    }

    render() {
        return (
            <div>
                <h1 className='display-4'>aMused</h1>
                <div className='jumbotron bg-light pt-5'>
                    <h1 className='font-weight-light mb-2'>Your Feed</h1>
                    <hr />
                    <div className='row'>
                        <div className='col-xl-9 col-lg-8'>
                            <ReviewFeed />
                        </div>
                        <div className='col-xl-3 col-lg-4'>
                            <div className='row'>
                                <div className='col'>
                                    <TopArtists/>
                                    <div className='mt-3'>
                                        <TopTracks/>
                                    </div>
                                </div>
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