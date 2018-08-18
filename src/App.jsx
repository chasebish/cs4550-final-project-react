import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { ArtistReducer, TrackReducer, SongReducer, UserReducer } from './reducers'

import { RootComponent } from './components'

const rootReducer = combineReducers({
    ArtistReducer,
    SongReducer,
    TrackReducer,
    UserReducer
})

const store = createStore(rootReducer)

const App = () => (
    <Provider store={store}>
        <RootComponent />
    </Provider>
)

export default App