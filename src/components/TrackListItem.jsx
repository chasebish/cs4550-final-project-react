import React from 'react'
import PropTypes from 'prop-types'

const TrackListItem = ({ track, rank }) => (
    <li className='list-group-item'>
        <h5 className='font-weight-light'>#{rank} {track.name}</h5>
    </li>
)

TrackListItem.propTypes = {
    track: PropTypes.object,
    rank: PropTypes.number
}

export default TrackListItem