import React from 'react'
import PropTypes from 'prop-types'

import './component.css'

const TrackListItem = ({ track, rank }) => (
    <li className='list-group-item list-group-item-primary cursor-pointer'>
        <h5 className='font-weight-light'>#{rank} <u>{track.name}</u></h5>
    </li>
)

TrackListItem.propTypes = {
    track: PropTypes.object,
    rank: PropTypes.number
}

export default TrackListItem