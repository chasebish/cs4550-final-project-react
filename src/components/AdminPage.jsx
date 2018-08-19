import React from 'react'
import UserService from "../services/UserService"

export default class AdminPage extends React.Component {

    constructor(props) {
        super(props)
        this.userService = UserService.instance
        this.state = {
            users: []
        }
        this.renderUsers = this.renderUsers.bind(this);
    }

    componentDidMount() {
        this.userService.findAllUsers()
            .then(users => {
                this.setState({
                    users: users
                })
            })
    }

    renderUsers() {
        var rows = this.state.users.map(user =>
                <tr>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <span class="btn btn-primary">Delete</span>
                    </td>
                    <td>
                        <span class="btn btn-primary">Edit</span>
                    </td>
                </tr>
        )
        return rows
    }

    render() {
        return (
            <div>
                <table class="table">
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
                    <tr>
                        <td><input id="usernameFld" class="form-control"
                            placeholder="Username" /></td>
                        <td><input id="passwordFld" class="form-control"
                            placeholder="Password" /></td>
                        <td><input id="firstNameFld" class="form-control"
                            placeholder="First Name" /></td>
                        <td><input id="lastNameFld" class="form-control"
                            placeholder="Last Name" /></td>
                        <td><input class="form-control"
                            placeholder="Email" /></td>
                        <td><input class="form-control"
                            placeholder="Role" /></td>
                        <td>
                            <span class="btn btn-primary">Add</span>
                            <span class="btn btn-primary">Save</span>
                        </td>
                    </tr>
                    <tbody>
                        {this.renderUsers()}
                    </tbody>
                </table>

            </div>
        )
    }
}