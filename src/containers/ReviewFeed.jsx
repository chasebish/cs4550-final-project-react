/* global alert */


import React from 'react'
import { ReviewService } from '../services'
import './containers.css'

export default class ReviewFeed extends React.Component {

    constructor(props) {
        super(props)
        this.reviewService = ReviewService.instance
        this.state = {
            reviews: []
        }
    }

    componentDidMount() {
        this.reviewService.findFollowedReviews()
            .then(reviews => {
                this.setState({
                    reviews: reviews
                })
            })
    }

    renderReviews = () => {
        var rows = this.state.reviews.sort((review1, review2) => new Date(review2.reviewTime) - new Date(review1.reviewTime)).map((review, index) =>
            <li id="review" className="font-weight-light list-group-item list-group-item-dark" key={index}>
                <div>Username: {review.username}</div>
                <div>Song: {review.songTitle}</div>
                <div>Artist: {review.songArtist}</div>
                <div>Review: {review.reviewText}</div>
                <div>at {new Date(review.reviewTime).toLocaleDateString()}, {new Date(review.reviewTime).toLocaleTimeString()}</div>

            </li>
        )
        return rows
    }

    onReviewClicked = (id) => {
        alert(id)
    }

    render() {
        return (
            <div>
                {this.state.reviews && this.state.reviews.length === 0 &&
                    <h1 className='font-weight-light'>You do not follow any reviewers!  Use the search bar discover to new users</h1>}
                <ul className="list-group">{this.renderReviews()}</ul>
            </div>
        )
    }
}