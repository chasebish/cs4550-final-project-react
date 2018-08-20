import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Modal, ModalBody, ModalFooter } from 'reactstrap'

import { ReviewService } from '../services'

import './containers.css'

class ReviewClass extends React.Component {

    constructor(props) {
        super(props)
        this.reviewService = ReviewService.instance
    }

    state = {
        reviewId: '',
        review: {},
        commentText: ''
    }

    updateCommentText = event => this.setState({ commentText: event.target.value })

    componentDidMount() {
        this.setState({ reviewId: this.props.match.params.reviewId })
        this.reviewService.findReviewById(this.props.match.params.reviewId)
            .then(review => {
                this.setReview(review)
            })
    }

    setReview = review => this.setState({ review })

    renderRatings = songratings => {
        let ratings = []
        for (let r of songratings) {
            switch (r.ratingType) {
            case 'OVERALL':
                ratings.push(
                    <div key={r.id}>
                        <small>
                            Overall: {r.ratingValue}
                        </small>
                        <br />
                    </div>
                )
                break
            case 'PRODUCTION':
                ratings.push(
                    <div key={r.id}>
                        <small>
                            Production: {r.ratingValue}
                        </small>
                        <br />
                    </div>
                )
                break
            case 'EMOTION':
                ratings.push(
                    <div key={r.id}>
                        <small>
                            Emotion: {r.ratingValue}
                        </small>
                        <br />
                    </div>
                )
                break
            case 'INSTRUMENTATION':
                ratings.push(
                    <div key={r.id}>
                        <small>
                            Instrumentals: {r.ratingValue}
                        </small>
                        <br />
                    </div>
                )
                break
            case 'LYRICISM':
                ratings.push(
                    <div key={r.id}>
                        <small>
                            Lyricism: {r.ratingValue}
                        </small>
                        <br />
                    </div>
                )
                break
            case 'VOCALS':
                ratings.push(
                    <div key={r.id}>
                        <small>
                            Vocals: {r.ratingValue}
                        </small>
                        <br />
                    </div>
                )
                break
            default:
                return
            }
        }
        return ratings
    }

    renderComments = comments => {
        
        let com = []
        for (let c of comments) {
            const comment = (
                <li key={c.id} className='list-group-item list-group-item-dark'>
                    {c.username}: {c.commentText}
                </li>
            )
            com.push(comment)
        }
        return com
    }

    addComment = () => {
        const comment = {
            commentText: this.state.commentText
        }
        this.reviewService.addComment(this.state.reviewId, comment)
            .then(() => {
                this.setState({ commentText: ''})
                this.reviewService.findReviewById(this.state.reviewId)
                    .then(review => {
                        this.setReview(review)
                    })
            })
    }

    render() {
        return (
            <div className='jumbotron'>
                <div className='text-center mb-3'>
                    <h3 className='font-weight-light'>Review for {'"' + this.state.review.songTitle + '"'}</h3>
                    <h6 className='font-weight-light'>By {this.state.review.username}</h6>
                </div>
                <div className="col-sm-6 offset-sm-3">
                    Review Body: <br />
                    <p>
                        {this.state.review.reviewText}
                    </p>
                    {this.state.review.ratings && this.renderRatings(this.state.review.ratings)}

                    <hr />
                    Comments: <br />
                    {this.state.review.comments &&
                        <ul className="list-group list-group mb-3">
                            {this.renderComments(this.state.review.comments)}
                        </ul>
                    }
                    Add Comment:
                    <textarea onChange={this.updateCommentText} className='form-control' rows="5"></textarea>
                    <button onClick={() => this.addComment()} className='btn btn-success mt-1'>Add Comment</button>
                </div>
            </div>
        )
    }
}

ReviewClass.propTypes = {
    match: PropTypes.object,
    user: PropTypes.object
}


const mapStateToProps = state => (
    {
        user: state.UserReducer.user
    }
)

const Song = connect(mapStateToProps)(ReviewClass)

export default Song