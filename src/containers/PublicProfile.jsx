import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import UserService from '../services/UserService'

class PublicProfile extends React.Component {

    constructor(props) {
        super(props)
        this.userService = UserService.instance
    }

    state = {
        user: '',
        banner: '',
        profilePic: '',
        name: '',
        reviews: [],
        uploads: [],
        followers: {
            id:'',
            followerName:'',
            followedName:''
        },
        showFollowers: false,
        showAlert: false,
    }

    componentDidMount() {
        this.userService.findUserByUsername(this.props.match.params.username)
            .then(user => {
                this.setUser(user)
                if (user.bannerImage) {
                    this.setBanner(user.bannerImage)
                }
                else {
                    this.setBanner('')
                }
                if (user.profilePic) {
                    this.setProfPic(user.profilePic)
                }
                else {
                    this.setProfPic('')
                }
                this.setName(user.username)
                this.setReviews(user.reviews)
                this.setUploads(user.uploads)
                this.setFollowers(user.followerList)
            })
    }

    showAlert = () => this.setState({ showAlert: true })
    hideAlert = () => this.setState({ showAlert: false })

    setUser = user => this.setState({user})
    setBanner = banner => {
        banner !== '' ?
            this.setState({banner:banner})
            :
            this.setState({banner: 'http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png'})
    }
    setProfPic = profPic => {
        profPic !== '' ? 
            this.setState({profilePic:profPic})
            :
            this.setState({profilePic: 'http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png'})
    }
    setName = name => this.setState({name:name})
    setReviews = reviews => this.setState({reviews})
    setUploads = uploads => this.setState({uploads})
    setFollowers = followers => this.setState({followers})
    setShowFollowers = () => {
        this.state.showFollowers ?
            this.setState({showFollowers: false}) : this.setState({showFollowers: true})
    } 

    renderRatings = (userRatings) => {
        let ratings = []
        for (let r of userRatings) {
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

    renderUploads = () => {
        let songCards = []
        let c = 0
        for (let song of this.state.uploads) {
            const card =
                <div key={c} className='col'>
                    <div className="card border-info">
                        <div className="card-body text-info">
                            <Link to={`/song/${this.state.name}/${song.title}`}><h5 className="card-title">{song.title}</h5></Link>
                        </div>
                    </div>
                </div>
            songCards.push(card)
            c++
        }
        return songCards
    }


    renderReviews = () => {
        let reviewCards = []
        let c = 0
        for (let review of this.state.reviews) {
            const card =
                <div key={c} className='col'>
                    <Link to={`/review/${review.id}`}>
                        <div className="card border-info">
                            <div className="card-body text-info">
                                <h5>{review.songArtist} - {review.songTitle}</h5>
                                <p className="card-title">{review.reviewText}</p>
                                {this.renderRatings(review.ratings)}
                            </div>
                        </div>
                    </Link>
                </div>
            reviewCards.push(card)
            c++
        }
        return reviewCards
    }

    follow = () => {
        this.userService.followUser(this.state.user.id)
            .then(res => {
                if (res.status === 200 || res.status === 201 || res.id) {
                    alert('You followed ' + this.state.name + '!')
                }
                else {
                    alert('You were unable to follow ' + this.state.name)
                }
            })
    }

    unfollow = () => {
        this.userService.unfollowUser(this.state.user.id)
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    alert('You unfollowed ' + this.state.name + '!')
                }
                else {
                    alert('You were unable to unfollow ' + this.state.name)
                }
            })
    }

    showFollowers = () => {
        let followers = []
        let c = 0
        if (this.state.followers) {
            for (let follower of this.state.followers) {
                const card =
                    <ul className="list-unstyled" key={c}>
                        <li className="card-body text-info">
                            {follower.followerName ?
                                <Link onClick={() => window.location = `/public-profile/${follower.followerName}`} to={`/public-profile/${follower.followerName}`}><h5>{follower.followerName}</h5></Link>
                                :
                                <h5>User {follower.id}</h5>
                            }
                        </li>
                    </ul>
                followers.push(card)
                c++
            }
        }
        return followers
    }

    render() {
        return (
            <div className='jumbotron bg-light pt-5'>
                <div> 
                    <img alt="banner pic" className='user-banner-img' src={this.state.banner} />
                </div>
                <img alt="prof pic" className='user-profilepic-img navbar-item' src={this.state.profilePic} />
                <h3 className='user-profile-name'>{this.state.name}</h3>
                <div className='user-interaction-container'>
                    <button onClick={() => this.follow()} id='follow-button' style={{border: 'solid 1px white', color: 'white'}} className='btn btn-link mr-3 ml-3'>Follow</button>
                    <button onClick={this.unfollow} style={{border: 'solid 1px white', color: 'white'}} className='btn btn-link mr-3 ml-3'>Unfollow</button>
                </div>
                <div className='user-content-container'>
                    <div className='user-profile-menu'>
                        <span className='spacer'></span>
                        <ul className="list-unstyled">
                            <li onClick={this.setShowFollowers} className="navbar-item">
                                Followers
                            </li>
                        </ul>
                    </div>
                    <div className='user-profile-content'>
                        {this.state.user.role === 'ARTIST' ?
                            <div className='row'>
                                <div><h3>Songs</h3></div>
                                <div>
                                    {this.renderUploads()}
                                </div>
                            </div>
                            :
                            <div className='row'>
                                <div><h3>Reviews</h3></div>
                                <div>
                                    {this.renderReviews()}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {this.state.showFollowers ?
                    <div className="modal" style={{display: 'inherit'}} role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Followers</h5>
                                </div>
                                <div className="modal-body">
                                    {this.showFollowers()}
                                </div>
                                <div className="modal-footer">
                                    <button onClick={this.setShowFollowers} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
        )
    }

}

PublicProfile.propTypes = {
    match: PropTypes.object,
    banner: PropTypes.string,
    profilePic: PropTypes.string,
    name: PropTypes.string
}

export default PublicProfile