import { artistActions } from '../constants'

let initialState = {
    topArtists: []
}

const artistReducer = (state = initialState, action) => {

    switch (action.type) {

    case artistActions.SET_ARTISTS:
        return {
            ...state,
            topArtists: action.topArtists.artists.artist
        }
    default:
        return state
    }

}

export default artistReducer