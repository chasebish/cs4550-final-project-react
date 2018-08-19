/* global fetch */

import { SERVER_URL } from '../constants'

let _singleton = Symbol()

export default class RatingService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new RatingService(_singleton)
        return this[_singleton]
    }

    createRating = (reviewId, rating) => {
        return fetch(`${SERVER_URL}/review/${reviewId}/rating`, {
            body: JSON.stringify(rating),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
    }



}