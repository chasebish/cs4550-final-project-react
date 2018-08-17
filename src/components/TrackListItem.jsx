import React from 'react'
import PropTypes from 'prop-types'

const TrackListItem = ({ track, rank }) => (
    <li className='list-group-item'>
        <h4>#{rank} {track.name}</h4>
    </li>
)

TrackListItem.propTypes = {
    track: PropTypes.object,
    rank: PropTypes.number
}

export default TrackListItem