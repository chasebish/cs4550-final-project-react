import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Navbar, NavbarToggler, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
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
                        <li className="nav-item">
                            <Link to="/request" className="nav-link">Request a Video</Link>
                        </li>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Profile
                            </DropdownToggle>
                            <DropdownMenu right>
                                {this.props.user.username &&
                                    <Link to="/profile" className="dropdown-item">View Profile</Link>}
                                {!this.props.user.username &&
                                    <div>
                                        <Link to="/register" className="dropdown-item">Register</Link>
                                        <Link to="/login" className="dropdown-item">Login</Link>
                                    </div>
                                }
                                {this.props.user.username &&
                                    <div>
                                        <DropdownItem divider />
                                        <button className='dropdown-item' onClick={() => this.logout()}>Logout</button>
                                    </div>
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </ul>
                    <div className="form-inline my-lg-0">
                        <input value={this.state.query} onChange={this.updateQuery} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button onClick={() => this.search(this.state.query)} className="btn btn-outline-success my-sm-0">
                            Search
                        </button>
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