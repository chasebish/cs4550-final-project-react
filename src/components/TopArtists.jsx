import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ArtistListItem } from '.'

const TopArtistsComponent = ({ topArtists }) => (
    <div>
        <ul className='list-group'>
            <li className='list-group-item'>
                <h3 className='font-weight-light'>Top Artists</h3>
            </li>
            {renderArtists(topArtists)}
        </ul>
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

    return artists.slice(0, 15)

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