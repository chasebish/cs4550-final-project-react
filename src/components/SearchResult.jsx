import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class SearchResult extends React.Component {

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
        if (typeof this.song.name !== 'undefined') {
            this.setImage(this.song.image[2]['#text'])
            this.setTitle(this.song.name)
            this.setArtist(this.song.artist)
        }
    }

    setSong = (song) => this.song = song;
    setImage = (url) => this.image = url;
    setTitle = (title) => this.title = title;
    setArtist = (artist) => this.artist = artist;

    render() {
        return (
            <div>
                <div className="float-left mr-3">
                    <img className="mr-3 float-left" src={this.image}></img>
                </div>
                <div>
                    <Link to={`/song/${this.artist}/${this.title}`}><h3>{this.artist} - {this.title}</h3></Link>
                </div>
            </div>
        )
    }
}

SearchResult.propTypes = {
    song: PropTypes.object
}