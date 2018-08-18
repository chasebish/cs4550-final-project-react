import { songActions } from '../constants'

let initialState = {
    topArtists: []
}

const songReducer = (state = initialState, action) => {

    switch (action.type) {

    case songActions.SET_SONGS:
        return {
            ...state,
            topArtists: action.songs
        }
    default:
        return state
    }

}

export default songReducer