import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SearchResult from '../components/SearchResult'
import SongService from '../services/SongService'
import songActions from  '../constants/songActions'

class SearchComponent extends React.Component {

    constructor(props) {
        super(props)
        this.songService = SongService.instance
    }

    state = {
        query: '',
    }

    componentDidMount() {
        this.setState({ query: this.props.match.params.query })
        this.songService.songSearch(this.props.match.params.query)
            .then(searchSongs => {
                this.props.setSearchSongs(searchSongs)
            }, () => {
                console.warn('Error retrieving songs')
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.props.match.params.query) {
            this.setState({ query: this.props.match.params.query })
            this.songService.songSearch(this.props.match.params.query)
                .then(searchSongs => {
                    this.props.setSearchSongs(searchSongs)
                }, () => {
                    console.warn('Error retrieving songs')
                })
        }
    }

    componentWillUnmount() {
        this.props.removeSearchsongs()
    }

    renderSongs = () => {

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
                            {/* <div className='col-lg-4 col-xl-5 align-middle'>
                                <DescriptionComponent className='leftMargin' video={video} />
                            </div> */}
                        </div>
                    </div>
                songs.push(component)
                c++
            }
        }
        return songs
    }

    render() {

        return (
            <div>
                <h1 className='font-weight-light'>{this.props.searchSongs.results ? this.props.searchSongs.results['opensearch:totalResults'] : 0} results for &quot;{this.state.query}&quot;</h1>
                {this.renderSongs()}
            </div>
        )

    }
    
}
    
SearchComponent.propTypes = {
    match: PropTypes.object,
    searchSongs: PropTypes.object,
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
        removeSearchsongs: () => dispatch({ type: 'REMOVE_SEARCH_SONGS' })
    }
)

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchComponent)

export default Search