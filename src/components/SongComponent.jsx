import React from 'react'
import PropTypes from 'prop-types'

import './component.css'

class SongComponent extends React.Component {

    song = {};
    image = '';
    artist = '';
    title = '';
    wiki = '';

    componentDidMount() {
        this.setSong(this.props.song)
    }

    componentWillReceiveProps(newProps) {
        this.setSong(newProps.song)
        if (typeof this.song.track !== 'undefined') {
            this.setImage(this.song.track.album.image[3]['#text'])
            this.setTitle(this.song.track.name)
            this.setArtist(this.song.track.artist.name)
            if (this.song.track.wiki) {
                this.setWiki(this.song.track.wiki.summary)
            }
        }
    }

    setSong = (song) => this.song = song;
    setImage = (url) => this.image = url;
    setTitle = (title) => this.title = title;
    setArtist = (artist) => this.artist = artist;
    setWiki = (wiki) => { 
        this.wiki = wiki.split('<a')[0]
    }

    render() {
        return (
            <div>
                <div className="float-left mr-3">
                    <img className="song-image mr-3 float-left" src={this.image}></img>
                </div>
                <div>
                    <h3>{this.artist} - {this.title}</h3>
                    <p>{this.wiki}</p>
                </div>
            </div>
        )
    }
}

SongComponent.propTypes = {
    song: PropTypes.any
}

export default SongComponent