import React from 'react'
import PropTypes from 'prop-types'

const ArtistListItem = ({ artist, rank }) => (
    <li className='list-group-item'>
        {/* {console.log(artist)} */}
        <h4>#{rank} {artist.name}</h4>
    </li>
)

ArtistListItem.propTypes = {
    artist: PropTypes.object,
    rank: PropTypes.number
}

export default ArtistListItem