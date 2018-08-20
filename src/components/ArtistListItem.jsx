import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import './component.css'

const ArtistListItem = ({ artist, rank, history }) => (
    <li onClick={() => routeArtist(artist, history)} className='list-group-item list-group-item-info cursor-pointer'>
        <h5 className='font-weight-light'>#{rank} <u>{artist.name}</u></h5>
    </li>
)

const routeArtist = (artist, history) => {
    history.push(`/public-profile/${artist.name}`)
}

ArtistListItem.propTypes = {
    artist: PropTypes.object,
    rank: PropTypes.number,
    history: PropTypes.object
}

export default withRouter(ArtistListItem)