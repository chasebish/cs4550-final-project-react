import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { TrackListItem } from '.'

const TopTracksComponent = ({ topTracks }) => (
    <div>
        <ul className='list-group'>
            <li className='list-group-item list-group-item-primary'>
                <h3 className='font-weight-light'>Top Tracks</h3>
            </li>
            {renderTracks(topTracks)}
        </ul>
    </div>
)

const renderTracks = (topTracks) => {

    let tracks = topTracks.map((track, index) => (
        <TrackListItem
            key={track.name}
            rank={index + 1}
            track={track}
        />
    ))

    return tracks.slice(0, 10)

}

TopTracksComponent.propTypes = {
    topTracks: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

const mapStateToProps = state => {
    return {
        topTracks: state.TrackReducer.topTracks
    }
}

const TopTracks = connect(mapStateToProps)(TopTracksComponent)

export default TopTracks