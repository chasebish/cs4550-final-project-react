import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class UserResult extends React.Component {

    state = {
        name : '',
    }

    componentDidMount() {
        this.setState({name: this.props.name})
    }

    render() {
        return (
            <div>
                <div>
                    <Link to={`/public-profile/${this.state.name}`}><h3>{this.props.name}</h3></Link>
                </div>
            </div>
        )
    }
}

UserResult.propTypes = {
    name: PropTypes.any
}