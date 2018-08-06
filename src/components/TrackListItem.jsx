import React from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'

const TrackListItem = ({ track, rank }) => (
    <ListGroupItem>
        {/* {console.log(track)} */}
        <h4>#{rank} {track.name}</h4>
    </ListGroupItem>
)

TrackListItem.propTypes = {
    track: PropTypes.object,
    rank: PropTypes.number
}

export default TrackListItem