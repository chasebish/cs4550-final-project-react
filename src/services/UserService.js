/* global fetch */

import { SERVER_URL } from '../constants'

let _singleton = Symbol()

export default class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserService(_singleton)
        return this[_singleton]
    }

    createUser = user =>
        fetch(`${SERVER_URL}/user`, {
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())

    followUser = userId => 
        fetch(`${SERVER_URL}/follow/userId`, {
            body: JSON.stringify(userId),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())

    findAllUsers = () =>
        fetch(`${SERVER_URL}/user`)
            .then(response => response.json())

    registerUser = user =>
        fetch(`${SERVER_URL}/register`, {
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())

    addUser = user =>
        fetch(`${SERVER_URL}/user`, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())

    deleteUser = id =>
        fetch(`${SERVER_URL}/user/` + id, {
            method: 'DELETE'
        })
            .then(response => response)

    loginUser = user =>
        fetch(`${SERVER_URL}/login`, {
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())

    logout = () =>
        fetch(`${SERVER_URL}/logout`, {
            credentials: 'include',
            method: 'POST'
        })


    updateUser = (userId, user) =>
        fetch(`${SERVER_URL}/user/${userId}`, {
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
            .then(response => response.json())

    findUserById = userId =>
        fetch(`${SERVER_URL}/user/${userId}`, {
            credentials: 'include'
        })
            .then(response => response.json())

    findUserByUsername = username =>
        fetch(`${SERVER_URL}/user/username/${username}`)
            .then(response => response.json())

    searchUsers = username => 
        fetch(`${SERVER_URL}/user/search/${username}`)
            .then(response => response.json())
    
    getProfile = () =>
        fetch(`${SERVER_URL}/profile`, {
            credentials: 'include'
        })
            .then(response => response.json())


}