/* global fetch */

let _singleton = Symbol()

const MUSIC_URL = 'http://ws.audioscrobbler.com/2.0/'
const API_KEY = 'c758ebc39655796f64621b54221d1477'

export default class MusicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MusicService(_singleton)
        return this[_singleton]
    }

    getArtistInfo(artistName) {
        return fetch(`${MUSIC_URL}?method=artist.getinfo&artist=${artistName}&api_key=${API_KEY}&format=json`)
            .then(response => response.json())
    }

    getArtistSearch(artistName) {
        return fetch(`${MUSIC_URL}?method=artist.search&artist=${artistName}&api_key=${API_KEY}&format=json`)
            .then(response => response.json())
    }

    getTopArtists() {
        return fetch(`${MUSIC_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json`)
            .then(response => response.json())
    }

    getTopTracks() {
        return fetch(`${MUSIC_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json`)
            .then(response => response.json())
    }

}