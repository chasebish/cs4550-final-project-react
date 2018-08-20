/* global fetch */

import { SERVER_URL } from '../constants'

let _singleton = Symbol()

export default class ReviewService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.')
    }
    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ReviewService(_singleton)
        return this[_singleton]
    }

    createReview = (songId, review) => {
        return fetch(`${SERVER_URL}/song/${songId}/review`, {
            body: JSON.stringify(review),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
    }

    findReviewById = reviewId => {
        return fetch(`${SERVER_URL}/review/${reviewId}`, {
            credentials: 'include'
        })
            .then(response => response.json())
    }

    addComment = (reviewId, comment) => {
        return fetch(`${SERVER_URL}/review/${reviewId}/comment`, {
            body: JSON.stringify(comment),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(response => response.json())
    }



}