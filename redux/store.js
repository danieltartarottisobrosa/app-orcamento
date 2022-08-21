import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import categories from './ducks/categories'
import entries from './ducks/entries'
import months from './ducks/months'
import types from './ducks/types'

export const store = configureStore({
  reducer: {
    categories,
    entries,
    months,
    types
  }
}, applyMiddleware(thunk))
