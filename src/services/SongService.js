/* global fetch */

import { SERVER_URL } from '../constants'

const SONG_URL = 'http://ws.audioscrobbler.com/2.0/'
const API_KEY = 'c758ebc39655796f64621b54221d1477'

let _singleton = Symbol()

export default class SongService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new SongService(_singleton)
        return this[_singleton]
    }

    findAllSongs = () =>
        fetch(`${SERVER_URL}/user`)
            .then(response => response.json())

    songSearch = query =>
        fetch(`${SONG_URL}?method=track.search&track=${query}&api_key=${API_KEY}&format=json`)
            .then(response => response.json())

    artistSearch = query =>
        fetch(`${SONG_URL}?method=artist.gettoptracks&artist=${query}&api_key=${API_KEY}&format=json`)
            .then(response => response.json())

    findSongByArtistAndTrack = (artist, track) =>
        fetch(`${SONG_URL}?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${track}&format=json`)
            .then(response => response.json())

    findSongBySongId = songId =>
        fetch(`${SERVER_URL}/song/${songId}`)
            .then(response => response.json())

    /**
     * Artist MUST be logged in to use this function!
     */
    createSongByArtist = song =>
        fetch(`${SERVER_URL}/artist/song`, {
            body: JSON.stringify(song),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())

    createSong = song =>
        fetch(`${SERVER_URL}/song`, {
            body: JSON.stringify(song),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())

    updateSong = (id, song) =>
        fetch(`${SERVER_URL}/song/${id}`, {
            body: JSON.stringify(song),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
            .then(response => response.json())

    deleteSong = id =>
        fetch(`${SERVER_URL}/song/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())

}