import React from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'

const ArtistListItem = ({ artist, rank }) => (
    <ListGroupItem>
        {console.log(artist)}
        <h4>#{rank} {artist.name}</h4>
    </ListGroupItem>
)

ArtistListItem.propTypes = {
    artist: PropTypes.object,
    rank: PropTypes.number
}

export default ArtistListItem