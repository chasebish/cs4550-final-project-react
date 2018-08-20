import React from 'react'
import { ReviewService } from '../services'

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
        var rows = this.state.reviews.map((review, index) =>
            <li className="list-group-item" key={index}>
                <div>Username: {review.username}</div>
                <div>Song: {review.songTitle}</div>
                <div>Artist:{review.songArtist}</div>
                Review: {review.reviewText}
            </li>
        )
        return rows
    }

    onReviewClicked = (id) => {
        alert(id)
    }

    render() {
        return (
            <ul className="list-group">{this.renderReviews()}</ul>
        )
    }
}