import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import { SongService } from '../services'
import { userActions } from '../constants'

class ArtistRegisterComponent extends React.Component {

    constructor(props) {
        super(props)
        this.songService = SongService.instance
    }

    state = {
        songName: '',
        modalOpen: false
    }

    updateSongName = event => this.setState({ songName: event.target.value })
    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

    addMore = () => {
        this.setState({ songName: '' })
        this.toggleModal()
    }

    navToVideo = () => this.props.history.push('/profile')

    addSong = () => {

        const newSong = {
            title: this.state.songName,
            artistName: this.props.user.username
        }

        this.songService.createSong(newSong)
            .then(() => {
                this.toggleModal()
            }, () => console.warn('Could not create song :('))
    }

    render() {
        return (
            <div className='jumbotron bg-light'>
                <h1 className='display-3'>Add a Song</h1>
                <div className='form-group row'>
                    <label htmlFor="email" className="col-sm-2 col-form-label">Artist Name</label>
                    <div className="col-sm-10">
                        <input disabled value={this.props.user.username ? this.props.user.username : ''} className="form-control" id="username" />
                    </div>
                </div>
                <div className='form-group row'>
                    <label htmlFor="songName" className="col-sm-2 col-form-label">Song Name</label>
                    <div className="col-sm-10">
                        <input value={this.state.songName} onChange={this.updateSongName} className="form-control" id="songName" placeholder="Song Name" />
                    </div>
                </div>
                <button className='btn btn-block btn-outline-success' onClick={() => this.addSong()}>
                    Add Song
                </button>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Song Recieved!</ModalHeader>
                    <ModalBody>
                        The song &quot;{this.state.songName}&quot; has been added to your profile!
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={() => this.addMore()} className='btn btn-outline-success'>Add more!</button>
                        <button onClick={() => this.navToVideo()} className='btn btn-outline-primary'>Profile</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

ArtistRegisterComponent.propTypes = {
    history: PropTypes.object,
    setUser: PropTypes.func,
    user: PropTypes.object
}

const mapStateToProps = state => (
    {
        user: state.UserReducer.user
    }
)

const mapDispatchToProps = dispatch => (
    {
        setUser: user => dispatch({ type: userActions.SET_USER, user })
    }
)

const ArtistRegister = connect(mapStateToProps, mapDispatchToProps)(ArtistRegisterComponent)
export default ArtistRegister