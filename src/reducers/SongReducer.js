import songActions from '../constants/songActions'

let initialState = {
    topArtists: [],
    songs: [],
    searchSongs: {}
}

const songReducer = (state = initialState, action) => {
    
    switch (action.type) {
    
    case songActions.SET_SONGS:
        return {
            ...state,
            topArtists: action.songs
        }
    case songActions.SET_SEARCH_SONGS:
        return {
            ...state,
            searchSongs: action.searchSongs,
        }
        
    case songActions.REMOVE_SEARCH_SONGS:
        return {
            ...state,
            searchSongs: {}
        }      
    default:
        return state
    }
    
}

export default songReducer