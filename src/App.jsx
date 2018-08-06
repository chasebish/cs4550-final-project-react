import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { ArtistReducer } from './reducers'

import RootComponent from './components/RootComponent'

const rootReducer = combineReducers({
    ArtistReducer
})

const store = createStore(rootReducer)

const App = () => (
    <Provider store={store}>
        <RootComponent />
    </Provider>
)

export default App