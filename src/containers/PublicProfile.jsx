import React from 'react'
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
                this.setReviews(user.reviews)
                this.setUploads(user.uploads)
                this.setName(user.username)
            })
    }

    setUser = user => this.setState({user})
    setBanner = banner => this.setState({banner:banner})
    setProfPic = profPic => this.setState({profilePic:profPic})
    setName = name => this.setState({name:name})
    setReviews = reviews => this.setState({reviews})
    setUploads = uploads => this.ssetState({uploads})

    renderUploads = () => {
        let songCards = []
        let c = 0
        for (let song of this.state.uploads) {
            const card =
                <div key={c} className='col-xl-4 col-md-6 mt-3'>
                    <div className="card border-info">
                        <div className="card-body text-info">
                            <h5 className="card-title">{song.title}</h5>
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
                <div key={c} className='col-xl-4 col-md-6 mt-3'>
                    <div className="card border-info">
                        <div className="card-body text-info">
                            <h5 className="card-title">{review.text}</h5>
                        </div>
                    </div>
                </div>
            reviewCards.push(card)
            c++
        }
        return reviewCards
    }

    render() {
        return (
            <div className='jumbotron bg-light pt-5'>
                <div> 
                    <img className='user-banner-img' src={this.state.banner} />
                </div>
                <img className='user-profilepic-img navbar-item' src={this.state.profilePic} />
                <h3 className='user-profile-name'>{this.state.name}</h3>
                <div className='user-interaction-container'>
                    <button style={{border: 'solid 1px white', color: 'white'}} className='btn btn-link mr-3 ml-3'>Follow</button>
                    <button style={{border: 'solid 1px white', color: 'white'}} className='btn btn-link mr-3 ml-3'>Unfollow</button>
                </div>
                <div className='user-profile-menu'>
                    <span className='spacer'></span>
                    <ul className="list-unstyled">
                        <li>
                            <a className="navbar-item " href="#">About</a>
                        </li>
                        <li>
                            <a className="navbar-item " href="#">Followers</a>
                        </li>
                    </ul>
                </div>
                <div className='user-profile-content'>
                    {this.state.user.role === 'ARTIST' ?
                        <div>
                            <h3>Songs</h3> 
                            {this.renderUploads()}
                        </div>
                        :
                        <div>
                            <h3>Reviews</h3>
                            {this.renderReviews()}
                        </div>
                    }
                </div>
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