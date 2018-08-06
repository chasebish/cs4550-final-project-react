import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'

import TrackListItem from '../components/TrackListItem'

const TopTracksComponent = ({ topTracks }) => (
    <div>
        <ListGroup>
            <ListGroupItem>
                <h3>Top Tracks</h3>
            </ListGroupItem>
            {renderTracks(topTracks)}
        </ListGroup>
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