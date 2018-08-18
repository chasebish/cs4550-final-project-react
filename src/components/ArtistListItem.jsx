import React from 'react'
import PropTypes from 'prop-types'

const ArtistListItem = ({ artist, rank }) => (
    <li className='list-group-item'>
        <h5 className='font-weight-light'>#{rank} {artist.name}</h5>
    </li>
)

ArtistListItem.propTypes = {
    artist: PropTypes.object,
    rank: PropTypes.number
}

export default ArtistListItem