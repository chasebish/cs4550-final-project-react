import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'

import { SongService, UserService, ReviewService, RatingService } from '../services'
import SongComponent from '../components/SongComponent'

import './containers.css'

class SongClass extends React.Component {

    constructor(props) {
        super(props)
        this.songService = SongService.instance
        this.userService = UserService.instance
        this.reviewService = ReviewService.instance
        this.ratingService = RatingService.instance
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
            vocals: undefined,
            instrumentals: undefined,
            lyricism: undefined,
            emotion: undefined
        },
        amusedSong: {}
    }

    componentDidMount() {
        this.songService.findSongByArtistAndTrack(this.props.match.params.artist, this.props.match.params.track)
            .then(song => {
                this.setSong(song)
                this.setName(song.track.name)

                const id = `${song.track.name.replace(/\s/g, '').toLowerCase()}-${song.track.artist.name.replace(/\s/g, '').toLowerCase()}`
                this.songService.findSongById(id)
                    .then(song => {
                        this.setState({ amusedSong: song })
                    })

                // Adds Artist and Song to the database if they don't exist yet
                this.addArtistAndSong(song.track)

            }, () => console.warn('Could not find song'))
    }

    addArtistAndSong = song => {

        this.userService.findUserByUsername(song.artist.name)
            .then(artist => {
                this.addSong(artist, song)
            }, () => {

                const newArtistUser = {
                    username: song.artist.name,
                    password: 'new-artist-password',
                    role: 'ARTIST'
                }

                this.userService.createUser(newArtistUser)
                    .then(artist => {
                        this.addSong(artist, song)
                    }, () => console.warn('ERROR CREATING ARTIST'))
            })

    }

    addSong = (artist, song) => {
        const id = `${song.name.replace(/\s/g, '').toLowerCase()}-${artist.username.replace(/\s/g, '').toLowerCase()}`
        this.songService.findSongById(id)
            .then(song => {
                this.setSongID(song.id)
            }, () => {
                const newSong = {
                    title: song.name,
                    artistName: artist.username,
                    songType: 'API'
                }
                this.songService.createSong(newSong)
                    .then(() => console.log('song created'), () => console.warn('no creation'))
            })
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
        const vocalsRating = {
            ratingType: 'VOCALS',
            ratingValue: this.state.rating.vocals
        }
        const instrumentalsRating = {
            ratingType: 'INSTRUMENTATION',
            ratingValue: this.state.rating.instrumentals
        }
        const lyricismRating = {
            ratingType: 'LYRICISM',
            ratingValue: this.state.rating.lyricism
        }
        const emotionRating = {
            ratingType: 'EMOTION',
            ratingValue: this.state.rating.emotion
        }

        this.reviewService.createReview(this.state.songID, review)
            .then(review => {
                this.ratingService.createRating(review.id, overallRating)
                this.ratingService.createRating(review.id, productionRating)
                this.ratingService.createRating(review.id, vocalsRating)
                this.ratingService.createRating(review.id, instrumentalsRating)
                this.ratingService.createRating(review.id, lyricismRating)
                this.ratingService.createRating(review.id, emotionRating)
                    .then(() => {
                        this.songService.findSongBySongId(this.state.songID)
                            .then(song => {
                                this.setState({ amusedSong: song })
                                console.log('amused song', song)
                            }, () => console.warn('Could not find song'))
                    })
                this.closeModal()
            }, () => console.warn('Could not post review'))

    }

    disableSubmitRating = () =>
        !(this.state.rating.overall >= 0) || !(this.state.rating.emotion >= 0) || !(this.state.rating.lyricism >= 0) || !(this.state.rating.production >= 0) ||
        !(this.state.rating.vocals >= 0) || !(this.state.rating.instrumentals >= 0) || this.state.reviewText.length === 0

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
    selectVocals = vocals => {
        const rating = { ...this.state.rating }
        rating.vocals = vocals
        this.setState({ rating })
    }
    selectInstrumentals = instrumentals => {
        const rating = { ...this.state.rating }
        rating.instrumentals = instrumentals
        this.setState({ rating })
    }
    selectLyricism = lyricism => {
        const rating = { ...this.state.rating }
        rating.lyricism = lyricism
        this.setState({ rating })
    }
    selectEmotion = emotion => {
        const rating = { ...this.state.rating }
        rating.emotion = emotion
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
    vocalsActive = rating => {
        if (rating === this.state.rating.vocals) {
            return 'active'
        }
    }
    instrumentalsActive = rating => {
        if (rating === this.state.rating.instrumentals) {
            return 'active'
        }
    }
    lyricismActive = rating => {
        if (rating === this.state.rating.lyricism) {
            return 'active'
        }
    }
    emotionActive = rating => {
        if (rating === this.state.rating.emotion) {
            return 'active'
        }
    }

    renderTags = () => {
        if (typeof this.state.song.track !== 'undefined') {
            let tags = []
            this.state.song.track.toptags.tag.map((tag, index) => tags.push(<li key={index} className='btn btn-light mr-3 ml-3 mt-2'>{tag.name}</li>))
            return tags
        }
    }

    renderReviews = () => {

        let reviews = []

        if (this.state.amusedSong.reviews) {
            for (let r of this.state.amusedSong.reviews) {
                console.log(r)
                const review = (
                    <div key={r.id} className='col-lg-6'>
                        <div className="card text-white bg-secondary mb-3">
                            <div className="card-header">
                                Review by {r.username}
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <p>{r.reviewText}</p>
                                    {this.renderRatings(r.ratings)}
                                    <br />
                                    <p className='font-weight-light'><small>at {new Date(r.reviewTime).toLocaleString()}</small></p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                )
                reviews.push(review)
            }
        }
        return reviews
    }

    renderRatings = songratings => {
        let ratings = []
        for (let r of songratings) {
            switch (r.ratingType) {
            case 'OVERALL':
                ratings.push(
                    <small key={r.id}>
                        Overall: {r.ratingValue}
                        <br />
                    </small>
                )
                break
            case 'PRODUCTION':
                ratings.push(
                    <small key={r.id}>
                        Production: {r.ratingValue}
                        <br />
                    </small>
                )
                break
            case 'EMOTION':
                ratings.push(
                    <small key={r.id}>
                        Emotion: {r.ratingValue}
                        <br />
                    </small>
                )
                break
            case 'INSTRUMENTATION':
                ratings.push(
                    <small key={r.id}>
                        Instrumentals: {r.ratingValue}
                        <br />
                    </small>
                )
                break
            case 'LYRICISM':
                ratings.push(
                    <small key={r.id}>
                        Lyricism: {r.ratingValue}
                        <br />
                    </small>
                )
                break
            case 'VOCALS':
                ratings.push(
                    <small key={r.id}>
                        Vocals: {r.ratingValue}
                        <br />
                    </small>
                )
                break
            default:
                return
            }
        }
        return ratings
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
                    {this.props.user.username &&
                        <button onClick={() => this.openModal()} className='btn btn-primary btn-block mt-3 mb-2'>Add Review</button>
                    }
                    {!this.props.user.username &&
                        <button className='btn btn-primary btn-block mt-3 mb-2' disabled>Add Review</button>
                    }

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
                    <div className='row justify-content-center minus-m-b-20'>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Overall</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Production</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Vocals</p>
                    </div>
                    <div className='row justify-content-center'>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{this.state.amusedSong.avgOverall}</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{this.state.amusedSong.avgProduction}</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{this.state.amusedSong.avgVocals}</p>
                    </div>
                    <div className='row justify-content-center minus-m-b-20'>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Instrumentals</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Lyricism</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>Emotion</p>
                    </div>
                    <div className='row justify-content-center'>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{this.state.amusedSong.avgInstrumentation}</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{this.state.amusedSong.avgLyricism}</p>
                        <p className='text-info col-xl-3 col-lg-4 col-md-3 col-4'>{this.state.amusedSong.avgEmotion}</p>
                    </div>
                </div>
                <div className='row'>
                    {this.renderReviews()}
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
                        <textarea className='form-control mt-2' onChange={this.updateReviewText} rows={6}></textarea>
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
                            <h6 className='font-weight-light mt-3'>Vocals</h6>
                            <div className="btn-group">
                                <button onClick={() => this.selectVocals(0)} className={`btn btn-outline-info ${this.vocalsActive(0)}`}>0</button>
                                <button onClick={() => this.selectVocals(1)} className={`btn btn-outline-info ${this.vocalsActive(1)}`}>1</button>
                                <button onClick={() => this.selectVocals(2)} className={`btn btn-outline-info ${this.vocalsActive(2)}`}>2</button>
                                <button onClick={() => this.selectVocals(3)} className={`btn btn-outline-info ${this.vocalsActive(3)}`}>3</button>
                                <button onClick={() => this.selectVocals(4)} className={`btn btn-outline-info ${this.vocalsActive(4)}`}>4</button>
                                <button onClick={() => this.selectVocals(5)} className={`btn btn-outline-info ${this.vocalsActive(5)}`}>5</button>
                                <button onClick={() => this.selectVocals(6)} className={`btn btn-outline-info ${this.vocalsActive(6)}`}>6</button>
                                <button onClick={() => this.selectVocals(7)} className={`btn btn-outline-info ${this.vocalsActive(7)}`}>7</button>
                                <button onClick={() => this.selectVocals(8)} className={`btn btn-outline-info ${this.vocalsActive(8)}`}>8</button>
                                <button onClick={() => this.selectVocals(9)} className={`btn btn-outline-info ${this.vocalsActive(9)}`}>9</button>
                                <button onClick={() => this.selectVocals(10)} className={`btn btn-outline-info ${this.vocalsActive(10)}`}>10</button>
                            </div>
                            <h6 className='font-weight-light mt-3'>Instrumentals</h6>
                            <div className="btn-group">
                                <button onClick={() => this.selectInstrumentals(0)} className={`btn btn-outline-info ${this.instrumentalsActive(0)}`}>0</button>
                                <button onClick={() => this.selectInstrumentals(1)} className={`btn btn-outline-info ${this.instrumentalsActive(1)}`}>1</button>
                                <button onClick={() => this.selectInstrumentals(2)} className={`btn btn-outline-info ${this.instrumentalsActive(2)}`}>2</button>
                                <button onClick={() => this.selectInstrumentals(3)} className={`btn btn-outline-info ${this.instrumentalsActive(3)}`}>3</button>
                                <button onClick={() => this.selectInstrumentals(4)} className={`btn btn-outline-info ${this.instrumentalsActive(4)}`}>4</button>
                                <button onClick={() => this.selectInstrumentals(5)} className={`btn btn-outline-info ${this.instrumentalsActive(5)}`}>5</button>
                                <button onClick={() => this.selectInstrumentals(6)} className={`btn btn-outline-info ${this.instrumentalsActive(6)}`}>6</button>
                                <button onClick={() => this.selectInstrumentals(7)} className={`btn btn-outline-info ${this.instrumentalsActive(7)}`}>7</button>
                                <button onClick={() => this.selectInstrumentals(8)} className={`btn btn-outline-info ${this.instrumentalsActive(8)}`}>8</button>
                                <button onClick={() => this.selectInstrumentals(9)} className={`btn btn-outline-info ${this.instrumentalsActive(9)}`}>9</button>
                                <button onClick={() => this.selectInstrumentals(10)} className={`btn btn-outline-info ${this.instrumentalsActive(10)}`}>10</button>
                            </div>
                            <h6 className='font-weight-light mt-3'>Lyricism</h6>
                            <div className="btn-group">
                                <button onClick={() => this.selectLyricism(0)} className={`btn btn-outline-info ${this.lyricismActive(0)}`}>0</button>
                                <button onClick={() => this.selectLyricism(1)} className={`btn btn-outline-info ${this.lyricismActive(1)}`}>1</button>
                                <button onClick={() => this.selectLyricism(2)} className={`btn btn-outline-info ${this.lyricismActive(2)}`}>2</button>
                                <button onClick={() => this.selectLyricism(3)} className={`btn btn-outline-info ${this.lyricismActive(3)}`}>3</button>
                                <button onClick={() => this.selectLyricism(4)} className={`btn btn-outline-info ${this.lyricismActive(4)}`}>4</button>
                                <button onClick={() => this.selectLyricism(5)} className={`btn btn-outline-info ${this.lyricismActive(5)}`}>5</button>
                                <button onClick={() => this.selectLyricism(6)} className={`btn btn-outline-info ${this.lyricismActive(6)}`}>6</button>
                                <button onClick={() => this.selectLyricism(7)} className={`btn btn-outline-info ${this.lyricismActive(7)}`}>7</button>
                                <button onClick={() => this.selectLyricism(8)} className={`btn btn-outline-info ${this.lyricismActive(8)}`}>8</button>
                                <button onClick={() => this.selectLyricism(9)} className={`btn btn-outline-info ${this.lyricismActive(9)}`}>9</button>
                                <button onClick={() => this.selectLyricism(10)} className={`btn btn-outline-info ${this.lyricismActive(10)}`}>10</button>
                            </div>
                            <h6 className='font-weight-light mt-3'>Emotion</h6>
                            <div className="btn-group">
                                <button onClick={() => this.selectEmotion(0)} className={`btn btn-outline-info ${this.emotionActive(0)}`}>0</button>
                                <button onClick={() => this.selectEmotion(1)} className={`btn btn-outline-info ${this.emotionActive(1)}`}>1</button>
                                <button onClick={() => this.selectEmotion(2)} className={`btn btn-outline-info ${this.emotionActive(2)}`}>2</button>
                                <button onClick={() => this.selectEmotion(3)} className={`btn btn-outline-info ${this.emotionActive(3)}`}>3</button>
                                <button onClick={() => this.selectEmotion(4)} className={`btn btn-outline-info ${this.emotionActive(4)}`}>4</button>
                                <button onClick={() => this.selectEmotion(5)} className={`btn btn-outline-info ${this.emotionActive(5)}`}>5</button>
                                <button onClick={() => this.selectEmotion(6)} className={`btn btn-outline-info ${this.emotionActive(6)}`}>6</button>
                                <button onClick={() => this.selectEmotion(7)} className={`btn btn-outline-info ${this.emotionActive(7)}`}>7</button>
                                <button onClick={() => this.selectEmotion(8)} className={`btn btn-outline-info ${this.emotionActive(8)}`}>8</button>
                                <button onClick={() => this.selectEmotion(9)} className={`btn btn-outline-info ${this.emotionActive(9)}`}>9</button>
                                <button onClick={() => this.selectEmotion(10)} className={`btn btn-outline-info ${this.emotionActive(10)}`}>10</button>
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
        user: state.UserReducer.user
    }
)

const Song = connect(mapStateToProps)(SongClass)

export default Song