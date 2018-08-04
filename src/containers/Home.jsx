import React from 'react'

import MusicService from '../services/MusicService'

export default class Home extends React.Component {

    constructor(props) {
        super(props)

        this.musicService = MusicService.instance
    }

    componentDidMount() {
        this.musicService.getTopArtists()
            .then(response => console.log(response))
    }

    render() {
        return (
            <h1>Home</h1>
        )
    }
}