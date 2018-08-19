import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SearchResult from '../components/SearchResult'
import UserResult from '../components/UserResult'
import SongService from '../services/SongService'
import UserService from '../services/UserService'
import songActions from '../constants/songActions'

class SearchComponent extends React.Component {

    constructor(props) {
        super(props)
        this.songService = SongService.instance
        this.userService = UserService.instance
        this.state = {
            query: '',
            showLastFm: true,
            showAmused: false,
            showUsers: false,
            amusedSongs: [],
            users: [],
        }
    }

    showLastFm = () => {
        this.setState({ showLastFm: true })
        this.setState({ showAmused: false })
        this.setState({ showUsers: false })
    }

    showAmused = () => {
        this.setState({ showLastFm: false })
        this.setState({ showAmused: true })
        this.setState({ showUsers: false })
    }

    showUsers = () => {
        this.setState({ showLastFm: false })
        this.setState({ showAmused: false })
        this.setState({ showUsers: true })
    }

    componentDidMount() {
        this.setState({ query: this.props.match.params.query })
        this.songService.songSearchLast(this.props.match.params.query)
            .then(searchSongs => {
                this.props.setSearchSongs(searchSongs)
            }, () => {
                console.warn('Error retrieving songs')
            })
        this.songService.songSearchAmuse(this.props.match.params.query)
            .then(searchSongs => {
                this.setState({ amusedSongs: searchSongs })
            })
        this.userService.searchUsers(this.props.match.params.query)
            .then(searchUsers => {
                this.setState({ users: searchUsers })
            })
    }

    componentWillUnmount() {
        this.props.removeSearchsongs()
    }

    renderLastFm  = () => {
        if (this.props.searchSongs.length === 0) {
            this.songService.songSearchLast(this.props.match.params.query)
                .then(searchSongs => {
                    this.props.setSearchSongs(searchSongs)
                }, () => {
                    console.warn('Error retrieving songs')
                })
        }
        let songs = []
        let c = 0
        if (this.props.searchSongs.results) {
            for (let song of this.props.searchSongs.results.trackmatches.track) {
                const component =
                    <div className='mt-3 bg-light' key={c}>
                        <div className='row m-1 mt-2 mb-2'>
                            <div className='col-lg-8 col-xl-7'>
                                <SearchResult song={song} />
                            </div>
                        </div>
                    </div>
                songs.push(component)
                c++
            }
        }
        return songs
    }

    renderAmused = () => {
        let songs = []
        let c = 0
        if (this.state.amusedSongs.length > 0) {
            for (let s of this.state.amusedSongs) {
                const song = {
                    'name': s.title,
                    'artist': s.artistName
                }
                const component =
                    <div className='mt-3 bg-light' key={c}>
                        <div className='row m-1 mt-2 mb-2'>
                            <div className='col-lg-8 col-xl-7'>
                                <SearchResult song={song} />
                            </div>
                        </div>
                    </div>
                songs.push(component)
                c++
            }
        }
        return songs
    }

    renderUsers = (role) => {
        let users = []
        let c = 0
        if (this.state.users[0]) {
            for (let u of this.state.users) {
                if (u.role === role) {
                    const component =
                        <div className='mt-3 bg-light' key={c}>
                            <div className='row m-1 mt-2 mb-2'>
                                <div className='col-sm-6'>
                                    <UserResult name={u.username} />
                                </div>
                            </div>
                        </div>
                    users.push(component)
                    c++
                }
            }
        }
        else {
            if (this.state.users.role === role) {
                const component =
                    <div className='mt-3 bg-light' key={c}>
                        <div className='row m-1 mt-2 mb-2'>
                            <div className='col-sm-6'>
                                <UserResult name={this.state.users.username} />
                            </div>
                        </div>
                    </div>
                users.push(component)
                c++
            }
        }
        return users
    }

    render() {

        return (
            <div>
                <button onClick={() => this.showLastFm()} className="btn btn-light mr-3">lastFm</button>
                <button onClick={() => this.showAmused()} className="btn btn-light mr-3">aMused</button>
                <button onClick={() => this.showUsers()} className="btn btn-light">Users</button>
                {this.state.showLastFm &&
                    <div>
                        <h1 className='font-weight-light'>{this.props.searchSongs.results ? this.props.searchSongs.results['opensearch:totalResults'] : 0} results for &quot;{this.state.query}&quot;</h1>
                        {this.renderLastFm()}
                    </div>
                }
                {this.state.showAmused &&
                    <div>
                        <h1 className='font-weight-light'>{this.props.searchSongs ? this.props.searchSongs.length : 0} Results for &quot;{this.state.query}&quot;</h1>
                        {this.renderAmused()}
                    </div>
                }
                {this.state.showUsers &&
                    <div>
                        <h1 className='font-weight-light'>{this.state.users.length} results for &quot;{this.state.query}&quot;</h1>
                        {this.renderUsers('ARTIST')}
                        {this.renderUsers('REVIEWER')}
                    </div>
                }
            </div>
        )

    }

}

SearchComponent.propTypes = {
    match: PropTypes.object,
    searchSongs: PropTypes.any,
    setSearchSongs: PropTypes.func,
    removeSearchsongs: PropTypes.func
}

const mapStateToProps = state => (
    {
        searchSongs: state.SongReducer.searchSongs
    }
)

const mapDispatchToProps = dispatch => (
    {
        setSearchSongs: searchSongs => dispatch({ type: songActions.SET_SEARCH_SONGS, searchSongs }),
        removeSearchsongs: () => dispatch({ type: songActions.REMOVE_SEARCH_SONGS })
    }
)

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComponent)

export default Search