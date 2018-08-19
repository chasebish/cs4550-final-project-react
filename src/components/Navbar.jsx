import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Navbar, NavbarToggler } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { userActions } from '../constants'
import { UserService } from '../services'

class CustomNavbarComponent extends React.Component {

    constructor(props) {
        super(props)
        this.userService = UserService.instance
    }

    componentDidMount() {
        this.userService.getProfile()
            .then(user => {
                this.props.setUser(user)
            }, () => { return })
    }

    state = {
        isOpen: false,
        query: ''
    }

    updateQuery = event => this.setState({ query: event.target.value })
    openNavButton = () => this.setState({ isOpen: !this.state.isOpen })

    logout = () => {
        this.userService.logout()
            .then(() => {
                this.props.logoutUser()
                this.props.history.push('/login')
            }, () => console.warn('LOGOUT ERROR'))
    }

    search = query => {
        this.props.history.push(`/search/${query}`)
    }

    render() {
        return (
            <Navbar className='mb-3' color="dark" dark expand="md">
                <Link to="/" className="navbar-brand">aMused</Link>
                <NavbarToggler onClick={this.openNavButton} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <ul className="navbar-nav mr-auto">
                        {this.props.user.username &&
                            <li className='nav-item'>
                                <div className='nav-link font-weight-light mb-2 mb-md-0 text-white-50'>User - {this.props.user.username}</div>
                            </li>
                        }
                        {this.props.user.role && this.props.user.role === 'ARTIST' &&
                            <li className="nav-item">
                                <Link to='/addsong' className='nav-link mb-2 mb-md-0'>Add a Song</Link>
                            </li>
                        }
                        {this.props.user.role && this.props.user.role === 'ADMIN' &&
                            <li className="nav-item">
                                <Link to='/admin' className='nav-link mb-2 mb-md-0'>Admin Page</Link>
                            </li>
                        }
                    </ul>
                    {!this.props.user.username &&
                        <div className="form-inline my-lg-0">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/register" className="btn btn-outline-info mr-md-2 mb-2 mb-md-0">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="btn btn-outline-info mr-md-2 mb-2 mb-md-0">Login</Link>
                                </li>
                            </ul>
                        </div>
                    }
                    {this.props.user.username &&
                        <div className="form-inline my-lg-0">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/profile" className="btn btn-outline-info mr-md-2 mb-2 mb-md-0">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => this.logout()} className="btn btn-outline-danger mr-md-2 mb-2 mb-md-0">Logout</button>
                                </li>
                            </ul>
                        </div>
                    }
                    <div className="form-inline my-lg-0">
                        <div className='input-group'>
                            <input value={this.state.query} onChange={this.updateQuery} className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button onClick={() => this.search(this.state.query)} className="btn btn-outline-success">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </Navbar>
        )
    }
}

CustomNavbarComponent.propTypes = {
    history: PropTypes.object,
    logoutUser: PropTypes.func,
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
        logoutUser: () => dispatch({ type: userActions.LOGOUT_USER }),
        setUser: user => dispatch({ type: userActions.SET_USER, user })
    }
)

const CustomNavbar = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomNavbarComponent))
export default CustomNavbar