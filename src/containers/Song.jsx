import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter} from 'reactstrap'

import SongService from '../services/SongService'
import UserService from '../services/UserService'
import SongComponent from '../components/SongComponent'

class SongClass extends React.Component {

    constructor(props) {
        super(props)
        this.songService = SongService.instance
        this.userService = UserService.instance
    }

    state = {
        songID: '',
        song: {},
        name: '',
        reviewText: '',
        openModal: false,
        rating: {
            overall: undefined,
            production: undefined,
            cuteness: undefined,
            sadness: undefined
        }
    }

    componentDidMount() {
        this.songService.findSongByArtistAndTrack(this.props.match.params.artist, this.props.match.params.track)
            .then(song => {
                this.setSong(song)
                this.setName(song.track.name)
            }, () => console.warn('Could not find song'))
    }

    updateReviewText = event => this.setState({ reviewText: event.target.value })
    setSongID = songID => this.setState({ songID })
    setSong = song => this.setState({ song })
    setName = name => this.setState({ name });
    openModal = () => this.setState({ openModal: true })
    closeModal = () => this.setState({ openModal: false })

    submitReviewRatings = () => {

        const review = {
            reviewText: this.state.reviewText,
        }

        const overallRating = {
            ratingType: 'OVERALL',
            ratingValue: this.state.rating.overall
        }
        const productionRating = {
            ratingType: 'PRODUCTION',
            ratingValue: this.state.rating.production
        }
        const cutenessRating = {
            ratingType: 'CUTENESS',
            ratingValue: this.state.rating.cuteness
        }
        const sadnessRating = {
            ratingType: 'SADNESS',
            ratingValue: this.state.rating.sadness
        }

        this.reviewService.createReview(this.state.song.id, review)
            .then(review => {
                this.ratingService.createRating(review.id, overallRating)
                this.ratingService.createRating(review.id, productionRating)
                this.ratingService.createRating(review.id, cutenessRating)
                this.ratingService.createRating(review.id, sadnessRating)
                this.songService.findSongById(this.props.match.params.songId)
                    .then(song => {
                        this.setSong(song)
                    }, () => console.warn('Could not find song'))
                this.closeModal()
            }, () => console.warn('Could not post review'))

    }

    disableSubmitRating = () =>
        !(this.state.rating.overall >= 0) || !(this.state.rating.humor >= 0) || !(this.state.rating.informative >= 0) || !(this.state.rating.production >= 0) || !(this.state.rating.cuteness >= 0) || !(this.state.rating.sadness >= 0) || this.state.reviewText.length === 0

    selectOverall = overall => {
        const rating = { ...this.state.rating }
        rating.overall = overall
        this.setState({ rating })
    }
    selectProduction = production => {
        const rating = { ...this.state.rating }
        rating.production = production
        this.setState({ rating })
    }
    selectCuteness = cuteness => {
        const rating = { ...this.state.rating }
        rating.cuteness = cuteness
        this.setState({ rating })
    }
    selectSadness = sadness => {
        const rating = { ...this.state.rating }
        rating.sadness = sadness
        this.setState({ rating })
    }

    overallActive = rating => {
        if (rating === this.state.rating.overall) {
            return 'active'
        }
    }
    productionActive = rating => {
        if (rating === this.state.rating.production) {
            return 'active'
        }
    }
    cutenessActive = rating => {
        if (rating === this.state.rating.cuteness) {
            return 'active'
        }
    }
    sadnessActive = rating => {
        if (rating === this.state.rating.sadness) {
            return 'active'
        }
    }

    renderTags = () => {
        if (typeof this.state.song.track !== 'undefined') {
            let tags = []
            this.state.song.track.toptags.tag.map(tag => {
                tags.push(<li className='btn btn-light mr-3 ml-3'>{tag.name}</li>)
            })
            return tags
        }
    }

    render() {
        return (
            <div className='jumbotron'>
                <div className='text-center mb-3'>
                    <h3 className='font-weight-light'>{this.state.song.name}</h3>
                </div>
                <div className='d-flex justify-content-center'>
                    <SongComponent song={this.state.song} />
                </div>
                <div className='text-center mt-2'>
                    {/* {this.props.user. ? */}
                    <button onClick={() => this.openModal()} className='btn btn-primary btn-block mt-2 mb-2'>Add Review</button>
                    {/* //     :
                    //     <button onClick={() => this.openModal()} className='btn btn-primary btn-block mt-2 mb-2 disabled' disabled>Add Review</button>
                    // } */}
                    <div className='row justify-content-center minus-m-b-20'>
                        <p className='text-primary col-3'>Listeners</p>
                        <p className='text-success col-3'>Playcount</p>
                    </div>
                    <div className='row justify-content-center'>
                        <p className='text-primary col-3'>{this.state.song.track ? this.state.song.track.listeners : ''}</p>
                        <p className='text-success col-3'>{this.state.song.track ? this.state.song.track.playcount : ''}</p>
                    </div>
                    <ul className='row justify-content-center'>
                        {this.renderTags()}
                    </ul>
                </div>
                <div className='text-center mt-4'>
                    <div className='row justify-content-center m-b-neg-20'>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Overall</p>
                    </div>
                    <div className='row justify-content-center m-b-neg-20'>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Production</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Cuteness</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Sadness</p>
                    </div>
                    {/* <div className='row justify-content-center'>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{this.state.video.avgProduction}</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{this.state.video.avgCuteness}</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{this.state.video.avgSadness}</p>
                    </div> */}
                </div>
                <Modal isOpen={this.state.openModal}>
                    <div className="modal-header">
                        <h5 className="modal-title">New Review</h5>
                        <button onClick={() => this.closeModal()} className="close float-right">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className='text-center'>
                            <h5>&quot;{this.state.name}&quot;</h5>
                        </div>
                        <p className='lead'>Review</p>
                        <textarea className='form-control mt-2' onChange={this.updateReviewText} rows={10}></textarea>
                    </ModalBody>
                    <ModalBody>
                        <p className='lead'>Ratings</p>
                        <div className='text-center'>
                            <h6 className='font-weight-light'>Overall</h6>
                            <div className="btn-group">
                                <button onClick={() => this.selectOverall(0)} className={`btn btn-outline-info ${this.overallActive(0)}`}>0</button>
                                <button onClick={() => this.selectOverall(1)} className={`btn btn-outline-info ${this.overallActive(1)}`}>1</button>
                                <button onClick={() => this.selectOverall(2)} className={`btn btn-outline-info ${this.overallActive(2)}`}>2</button>
                                <button onClick={() => this.selectOverall(3)} className={`btn btn-outline-info ${this.overallActive(3)}`}>3</button>
                                <button onClick={() => this.selectOverall(4)} className={`btn btn-outline-info ${this.overallActive(4)}`}>4</button>
                                <button onClick={() => this.selectOverall(5)} className={`btn btn-outline-info ${this.overallActive(5)}`}>5</button>
                                <button onClick={() => this.selectOverall(6)} className={`btn btn-outline-info ${this.overallActive(6)}`}>6</button>
                                <button onClick={() => this.selectOverall(7)} className={`btn btn-outline-info ${this.overallActive(7)}`}>7</button>
                                <button onClick={() => this.selectOverall(8)} className={`btn btn-outline-info ${this.overallActive(8)}`}>8</button>
                                <button onClick={() => this.selectOverall(9)} className={`btn btn-outline-info ${this.overallActive(9)}`}>9</button>
                                <button onClick={() => this.selectOverall(10)} className={`btn btn-outline-info ${this.overallActive(10)}`}>10</button>
                            </div>
                            <h6 className='font-weight-light mt-3'>Production</h6>
                            <div className="btn-group">
                                <button onClick={() => this.selectProduction(0)} className={`btn btn-outline-info ${this.productionActive(0)}`}>0</button>
                                <button onClick={() => this.selectProduction(1)} className={`btn btn-outline-info ${this.productionActive(1)}`}>1</button>
                                <button onClick={() => this.selectProduction(2)} className={`btn btn-outline-info ${this.productionActive(2)}`}>2</button>
                                <button onClick={() => this.selectProduction(3)} className={`btn btn-outline-info ${this.productionActive(3)}`}>3</button>
                                <button onClick={() => this.selectProduction(4)} className={`btn btn-outline-info ${this.productionActive(4)}`}>4</button>
                                <button onClick={() => this.selectProduction(5)} className={`btn btn-outline-info ${this.productionActive(5)}`}>5</button>
                                <button onClick={() => this.selectProduction(6)} className={`btn btn-outline-info ${this.productionActive(6)}`}>6</button>
                                <button onClick={() => this.selectProduction(7)} className={`btn btn-outline-info ${this.productionActive(7)}`}>7</button>
                                <button onClick={() => this.selectProduction(8)} className={`btn btn-outline-info ${this.productionActive(8)}`}>8</button>
                                <button onClick={() => this.selectProduction(9)} className={`btn btn-outline-info ${this.productionActive(9)}`}>9</button>
                                <button onClick={() => this.selectProduction(10)} className={`btn btn-outline-info ${this.productionActive(10)}`}>10</button>
                            </div>
                            <h6 className='font-weight-light mt-3'>Cuteness</h6>
                            <div className="btn-group">
                                <button onClick={() => this.selectCuteness(0)} className={`btn btn-outline-info ${this.cutenessActive(0)}`}>0</button>
                                <button onClick={() => this.selectCuteness(1)} className={`btn btn-outline-info ${this.cutenessActive(1)}`}>1</button>
                                <button onClick={() => this.selectCuteness(2)} className={`btn btn-outline-info ${this.cutenessActive(2)}`}>2</button>
                                <button onClick={() => this.selectCuteness(3)} className={`btn btn-outline-info ${this.cutenessActive(3)}`}>3</button>
                                <button onClick={() => this.selectCuteness(4)} className={`btn btn-outline-info ${this.cutenessActive(4)}`}>4</button>
                                <button onClick={() => this.selectCuteness(5)} className={`btn btn-outline-info ${this.cutenessActive(5)}`}>5</button>
                                <button onClick={() => this.selectCuteness(6)} className={`btn btn-outline-info ${this.cutenessActive(6)}`}>6</button>
                                <button onClick={() => this.selectCuteness(7)} className={`btn btn-outline-info ${this.cutenessActive(7)}`}>7</button>
                                <button onClick={() => this.selectCuteness(8)} className={`btn btn-outline-info ${this.cutenessActive(8)}`}>8</button>
                                <button onClick={() => this.selectCuteness(9)} className={`btn btn-outline-info ${this.cutenessActive(9)}`}>9</button>
                                <button onClick={() => this.selectCuteness(10)} className={`btn btn-outline-info ${this.cutenessActive(10)}`}>10</button>
                            </div>
                            <h6 className='font-weight-light mt-3'>Sadness</h6>
                            <div className="btn-group">
                                <button onClick={() => this.selectSadness(0)} className={`btn btn-outline-info ${this.sadnessActive(0)}`}>0</button>
                                <button onClick={() => this.selectSadness(1)} className={`btn btn-outline-info ${this.sadnessActive(1)}`}>1</button>
                                <button onClick={() => this.selectSadness(2)} className={`btn btn-outline-info ${this.sadnessActive(2)}`}>2</button>
                                <button onClick={() => this.selectSadness(3)} className={`btn btn-outline-info ${this.sadnessActive(3)}`}>3</button>
                                <button onClick={() => this.selectSadness(4)} className={`btn btn-outline-info ${this.sadnessActive(4)}`}>4</button>
                                <button onClick={() => this.selectSadness(5)} className={`btn btn-outline-info ${this.sadnessActive(5)}`}>5</button>
                                <button onClick={() => this.selectSadness(6)} className={`btn btn-outline-info ${this.sadnessActive(6)}`}>6</button>
                                <button onClick={() => this.selectSadness(7)} className={`btn btn-outline-info ${this.sadnessActive(7)}`}>7</button>
                                <button onClick={() => this.selectSadness(8)} className={`btn btn-outline-info ${this.sadnessActive(8)}`}>8</button>
                                <button onClick={() => this.selectSadness(9)} className={`btn btn-outline-info ${this.sadnessActive(9)}`}>9</button>
                                <button onClick={() => this.selectSadness(10)} className={`btn btn-outline-info ${this.sadnessActive(10)}`}>10</button>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.disableSubmitRating() ?
                            <button onClick={() => this.submitReviewRatings()} className='btn btn-success disabled' disabled>Add Review</button>
                            :
                            <button onClick={() => this.submitReviewRatings()} className='btn btn-success'>Add Review</button>
                        }
                        <button onClick={() => this.closeModal()} className='btn btn-danger'>Exit</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

SongClass.propTypes = {
    match: PropTypes.object,
    user: PropTypes.object
}


const mapStateToProps = state => (
    {
        user: state.user.user
    }
)

connect(mapStateToProps)(SongClass)

export default SongClass