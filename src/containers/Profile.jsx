import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { userActions } from '../constants'
import { songActions } from '../constants'
import { UserService } from '../services'
import { SongService } from '../services'

import './containers.css'

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props)
        this.userService = UserService.instance
        this.songService = SongService.instance
    }

    state = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        profilePic: '',
        bannerImage: '',
        showAlert: false
    }

    componentDidMount() {
        !this.props.user.username ?
            this.userService.getProfile()
                .then(userProfile => {
                    this.userService.findUserById(userProfile.id)
                        .then(user => {
                            this.setLocalUser(user)
                            this.props.setUser(user)
                        })
                }, () => this.props.history.push('/login'))
            :
            this.setLocalUser(this.props.user)
    }

    setLocalUser = user => {
        user.username !== null && this.setUsername(user.username)
        user.password !== null && this.setPassword(user.password)
        user.firstName !== null && this.setFirstName(user.firstName)
        user.lastName !== null && this.setLastName(user.lastName)
        user.email !== null && this.setEmail(user.email)
        user.profilePic !== null && this.setProfPic(user.profilePic)
        user.bannerImage !== null && this.setBannerImage(user.bannerImage)
        this.songService.artistSearch(user.username)
            .then(searchSongs => {
                this.props.setSearchSongs(searchSongs)
            }, () => {
                console.warn('Error retrieving songs')
            })
    }

    updateUser = () => {
        const user = {
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            role: this.props.user.role,
            profilePic: this.state.profilePic,
            bannerImage: this.state.bannerImage
        }
        this.userService.updateUser(this.props.user.id, user)
            .then(newUser => {
                this.props.setUser(newUser)
                this.showAlert()
                setTimeout(() => this.hideAlert(), 3000)
            }, () => console.warn('Error updating user'))
    }

    logout = () => {
        this.userService.logout()
        this.props.history.push('/login')
    }

    showAlert = () => this.setState({ showAlert: true })
    hideAlert = () => this.setState({ showAlert: false })

    setUsername = username => this.setState({ username })
    setPassword = password => this.setState({ password })
    setFirstName = firstName => this.setState({ firstName })
    setLastName = lastName => this.setState({ lastName })
    setEmail = email => this.setState({ email })
    setProfPic = profilePic => this.setState({ profilePic })
    setBannerImage = bannerImage => this.setState({ bannerImage })

    updatePassword = event => this.setState({ password: event.target.value })
    updateFirstName = event => this.setState({ firstName: event.target.value })
    updateLastName = event => this.setState({ lastName: event.target.value })
    updateEmail = event => this.setState({ email: event.target.value })
    updateProfPic = event => this.setState({ profilePic: event.target.value })
    updateBannerImage = event => this.setState({ bannerImage: event.target.value })

    renderSongs = songs => {
        let songCards = []
        if (songs) {
            for (const song of songs) {
                const card =
                    <div key={song.title} className='col-xl-4 col-md-6 mt-3'>
                        <div className="card border-info">
                            <div className="card-body text-info">
                                <h5 className="card-title">{song.title}</h5>
                                <p className="card-text">Add Song Button</p>
                            </div>
                        </div>
                    </div>
                songCards.push(card)
            }
        }
        return songCards
    }

    renderApiSongs = () => {
        let songCards = []
        if (this.props.searchSongs.toptracks) {
            for (let song of this.props.searchSongs.toptracks.track) {
                const component =
                    <div key={song.name} className='col-xl-4 col-md-6 mt-3'>
                        <div className="card border-info">
                            <div className="card-body text-info">
                                <h5 className="card-title">{song.name}</h5>
                                <p className="card-text">Add Song Button</p>
                            </div>
                        </div>
                    </div>
                songCards.push(component)
            }
        }
        return songCards
    }

    render() {
        return (
            <div className='jumbotron'>
                {this.props.user && this.props.user.role === 'REVIEWER' &&
                    <h1 className="display-3">Profile</h1>
                }
                {this.props.user && this.props.user.role === 'ADMIN' &&
                    <h1 className="display-3">Admin Profile</h1>
                }
                {this.props.user && this.props.user.role === 'ARTIST' &&
                    <h1 className="display-3">Artist Profile</h1>
                }
                <h4 className="font-weight-light">Welcome {this.props.user.username}</h4>
                <div className="mt-3">
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-3 col-md-2 col-form-label lead">Username</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.username} id='username' className='form-control' readOnly />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-3 col-md-2 col-form-label lead">Password</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.password} onChange={this.updatePassword} id='password' className='form-control' type='password' />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-3 col-md-2 col-form-label lead">First Name</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.firstName} onChange={this.updateFirstName} id='firstName' className='form-control' />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-sm-3 col-md-2 col-form-label lead">Last Name</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.lastName} onChange={this.updateLastName} id='lastName' className='form-control' />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-3 col-md-2 col-form-label lead">Email</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.email} onChange={this.updateEmail} id='email' className='form-control' />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="bannerImage" className="col-sm-3 col-md-2 col-form-label lead">Banner Image URL</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.bannerImage} onChange={this.updateBannerImage} id='bannerImage' className='form-control' />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="profilePic" className="col-sm-3 col-md-2 col-form-label lead">Profile Picture URL</label>
                        <div className="col-sm-9 col-md-10">
                            <input value={this.state.profilePic} onChange={this.updateProfPic} id='profilePic' className='form-control' />
                        </div>
                    </div>
                    <button onClick={() => this.updateUser()} className='btn btn-outline-success btn-block mt-2'>
                        Update Profile
                    </button>
                    <button onClick={() => this.logout()} className='btn btn-outline-danger btn-block mt-2'>
                        Logout
                    </button>

                    {this.props.user && this.props.user.role === 'ARTIST' &&
                        <div className='mt-5'>
                            <h4 className="font-weight-light">Your aMused Songs</h4>
                            <div className='row'>
                                {this.renderSongs(this.props.user.uploads)}
                            </div>
                            <h4 className="font-weight-light mt-3">Your LastFM Songs</h4>
                            <div className='row'>
                                {this.renderApiSongs()}
                            </div>
                        </div>
                    }
                    {this.state.showAlert &&
                        <div className="alert alert-success text-center mt-3" role="alert">
                            Profile Updated!
                        </div>
                    }
                </div>
            </div>
        )
    }

}

ProfileComponent.propTypes = {
    history: PropTypes.object,
    user: PropTypes.object,
    setSearchSongs: PropTypes.any,
    searchSongs: PropTypes.object,
    setUser: PropTypes.func
}

const mapStateToProps = state => (
    {
        user: state.UserReducer.user,
        searchSongs: state.SongReducer.searchSongs
    }
)

const mapDispatchToProps = dispatch => (
    {
        setUser: user => dispatch({ type: userActions.SET_USER, user }),
        setSearchSongs: searchSongs => dispatch({ type: songActions.SET_SEARCH_SONGS, searchSongs })
    }
)

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent)
export default Profile