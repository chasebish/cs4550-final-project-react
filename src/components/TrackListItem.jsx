import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import './component.css'

const TrackListItem = ({ track, rank, history }) => (
    <li onClick={() => routeSong(track, history)} className='list-group-item list-group-item-primary cursor-pointer'>
        <h5 className='font-weight-light'>#{rank} <u>{track.name}</u></h5>
        {console.log(history)}
    </li>
)

const routeSong = (track, history) => {
    history.push(`/song/${track.artist.name}/${track.name}`)
}

TrackListItem.propTypes = {
    track: PropTypes.object,
    rank: PropTypes.number,
    history: PropTypes.object
}

export default withRouter(TrackListItem)