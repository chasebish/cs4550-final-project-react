import React from 'react'
import { UserService } from '../services'

export default class AdminPage extends React.Component {

    constructor(props) {
        super(props)
        this.userService = UserService.instance
        this.state = {
            users: [],
            editing: false,
            role: 'REVIEWER',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: ''
        }
    }

    componentDidMount() {
        this.userService.findAllUsers()
            .then(users => {
                this.setState({
                    users: users
                })
            })
    }

    renderUsers = () => {
        var rows = this.state.users.map((user, index) =>
            <tr key={index}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <span className='btn btn-outline-danger' onClick={() => this.onDeleteClicked(user.id)}>Delete</span>
                </td>
                <td>
                    <span className='btn btn-outline-info' onClick={() => this.onEditClicked(user)}>Edit</span>
                </td>
            </tr>
        )
        return rows
    }

    onAddClicked = () => {
        this.userService.addUser({
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            role: this.state.role
        })
            .then(() => {
                this.userService.findAllUsers()
                    .then(users => {
                        this.setState({
                            users: users,
                            username: '',
                            password: '',
                            firstName: '',
                            lastName: '',
                            email: ''
                        })
                    })
            })
    }

    onDeleteClicked = (id) => {
        this.userService.deleteUser(id)
            .then(() => {
                this.userService.findAllUsers()
                    .then(users => {
                        this.setState({
                            users: users
                        })
                    })
            })
    }

    onEditClicked = (user) => {
        this.setState({
            userId: user.id,
            editing: true,
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        })
    }

    onSaveClicked = () => {
        this.userService.updateUser(this.state.userId, {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            role: this.state.role
        }).then(() => {
            this.userService.findAllUsers()
                .then(users => {
                    this.setState({
                        users: users,
                        editing: false,
                        username: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        email: ''
                    })
                })
        })
    }

    onUsernameUpdated = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onPasswordUpdated = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onFirstNameUpdated = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }

    onLastNameUpdated = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    onEmailUpdated = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onRoleUpdated = (event) => {
        this.setState({
            role: event.target.value
        })
    }

    render() {
        return (
            <div className='table-responsive'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input id='usernameFld' className='form-control' type='text'
                                placeholder='Username' onChange={this.onUsernameUpdated} value={this.state.username} /></td>
                            <td><input id='passwordFld' className='form-control'
                                placeholder='Password' onChange={this.onPasswordUpdated} value={this.state.password} /></td>
                            <td><input id='firstNameFld' className='form-control'
                                placeholder='First Name' onChange={this.onFirstNameUpdated} value={this.state.firstName} /></td>
                            <td><input id='lastNameFld' className='form-control'
                                placeholder='Last Name' onChange={this.onLastNameUpdated} value={this.state.lastName} /></td>
                            <td><input className='form-control'
                                placeholder='Email' onChange={this.onEmailUpdated} value={this.state.email} /></td>
                            <td><select className='form-control' onChange={this.onRoleUpdated} value={this.state.role}>
                                <option value='REVIEWER'>Reviewer</option>
                                <option value='ARTIST'>Artist</option>
                                <option value='ADMIN'>Admin</option>
                            </select></td>
                            <td><span className='btn btn-outline-info' onClick={() => this.onAddClicked()} hidden={this.state.editing}>Add</span>
                                <span className='btn btn-outline-info' onClick={() => this.onSaveClicked()} hidden={!this.state.editing}>Save</span>
                            </td>
                        </tr>
                        {this.renderUsers()}
                    </tbody>
                </table>

            </div >
        )
    }
}