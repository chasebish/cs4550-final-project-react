import { trackActions } from '../constants'

let initialState = {
    topTracks: []
}

const trackReducer = (state = initialState, action) => {

    switch (action.type) {

    case trackActions.SET_TRACKS:
        return {
            ...state,
            topTracks: action.topTracks.tracks.track
        }
    default:
        return state
    }

}

export default trackReducer