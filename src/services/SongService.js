/* global fetch */

import { SERVER_URL } from '../constants'

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
        fetch(`${SERVER_URL}/song/search/${query}`)
            .then(response => response.json())

    findSongById = id =>
        fetch(`${SERVER_URL}/song/${id}`)
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