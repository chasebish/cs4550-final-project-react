import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class SearchResult extends React.Component {

    state = {
        song : {},
        image : '',
        artist : '',
        title : '',
        wiki : '',
    }

    componentDidMount() {
        this.setState({song: this.props.song}, () => {
            if (typeof this.state.song.name !== 'undefined') {
                if (this.state.song.image) {
                    this.setImage(this.state.song.image[2]['#text'])
                }
                this.setTitle(this.state.song.name)
                this.setArtist(this.state.song.artist)
            }
        })
    }

    setImage = (url) => this.setState({ image: url })
    setTitle = (title) => this.setState({title: title})
    setArtist = (artist) => this.setState({artist: artist})

    render() {
        return (
            <div>
                <div className="float-left mr-3">
                    {this.state.image ? <img className="mr-3 float-left" src={this.state.image} alt='song-thumbnail'></img> : ''}
                </div>
                <div>
                    <Link to={`/song/${this.props.song.artist}/${this.props.song.name}`}><h3>{this.props.song.artist} - {this.props.song.name}</h3></Link>
                </div>
            </div>
        )
    }
}

SearchResult.propTypes = {
    song: PropTypes.object
}