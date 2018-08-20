import React from 'react'
import PropTypes from 'prop-types'

import './component.css'

const ArtistListItem = ({ artist, rank }) => (
    <li onClick={() => console.log(artist)} className='list-group-item list-group-item-info cursor-pointer'>
        <h5 className='font-weight-light'>#{rank} <u>{artist.name}</u></h5>
    </li>
)

ArtistListItem.propTypes = {
    artist: PropTypes.object,
    rank: PropTypes.number
}

export default ArtistListItem