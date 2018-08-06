import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'

import { ArtistListItem } from '../components'

const TopArtistsComponent = ({ topArtists }) => (
    <div>
        <ListGroup>
            <ListGroupItem>
                <h3>Top Artists</h3>
            </ListGroupItem>
            {renderArtists(topArtists)}
        </ListGroup>
    </div>
)

const renderArtists = (topArtists) => {

    let artists = topArtists.map((artist, index) => (
        <ArtistListItem
            key={artist.name}
            rank={index + 1}
            artist={artist}
        />
    ))

    return artists.slice(0, 10)

}

TopArtistsComponent.propTypes = {
    topArtists: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

const mapStateToProps = state => {
    return {
        topArtists: state.ArtistReducer.topArtists
    }
}

const TopArtists = connect(mapStateToProps)(TopArtistsComponent)

export default TopArtists