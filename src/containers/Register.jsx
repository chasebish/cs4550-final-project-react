/* global alert */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { UserService } from '../services'
import { userActions } from '../constants'

class RegisterComponent extends React.Component {

    constructor(props) {
        super(props)
        this.userService = UserService.instance
    }

    state = {
        username: '',
        password: '',
        confirmPassword: ''
    }

    updateUsername = (event) => this.setState({ username: event.target.value })
    updatePassword = (event) => this.setState({ password: event.target.value })
    updateConfirmPassword = (event) => this.setState({ confirmPassword: event.target.value })

    register = () => {

        console.log(this.state.username)

        this.userService.findUserByUsername(this.state.username)
            .then(user => {
                alert(`"${user.username}" username is already taken`)
                return
            }, () => {
                if (this.state.username.length < 3) {
                    alert('Username must be at least 3 characters')
                    return
                }

                if (this.state.password !== this.state.confirmPassword) {
                    alert('Passwords must match')
                    return
                }

                const user = {
                    username: this.state.username,
                    password: this.state.password,
                    role: 'REVIEWER'
                }

                console.log(user)

                this.userService.registerUser(user)
                    .then(user => {
                        this.props.setUser(user)
                        this.props.history.push('/')
                    }, () => console.warn('server error'))
            })

    }

    render() {
        return (
            <div className='jumbotron bg-light'>
                <h1 className='display-3'>Register</h1>
                <div className='form-group row'>
                    <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input value={this.state.username} onChange={this.updateUsername} className="form-control" id="username" placeholder="Username" />
                    </div>
                </div>
                <div className='form-group row'>
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input value={this.state.password} onChange={this.updatePassword} type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                </div>
                <div className='form-group row'>
                    <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                    <div className="col-sm-10">
                        <input value={this.state.confirmPassword} onChange={this.updateConfirmPassword} type="password" className="form-control" id="confirmPassword"
                            placeholder="Confirm Password" />
                    </div>
                </div>
                <button className='btn btn-block btn-success' onClick={() => this.register()}>
                    Register
                </button>
                <hr className="my-4" />
                <div className="form-group text-center">
                    <Link to="/login" className="btn btn-primary form-control col-sm-8 col-md-6" id='login' role="button">Login</Link>
                    <br />
                    <small htmlFor="login" className="">Existing User?</small>
                </div>
                <div className="form-group text-center">
                    <Link to="/register/artist" className="btn btn-info form-control col-sm-8 col-md-6" id='login' role="button">Artist Portal</Link>
                    <br />
                    <small htmlFor="login" className="">New Artist?</small>
                </div>
            </div>
        )
    }

}

RegisterComponent.propTypes = {
    history: PropTypes.object,
    setUser: PropTypes.func
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => (
    {
        setUser: user => dispatch({ type: userActions.SET_USER, user })
    }
)

const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)
export default Register