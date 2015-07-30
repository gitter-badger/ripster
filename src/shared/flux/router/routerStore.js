import {routerReducer} from 'vstack-router/dist/redux'

import {
  APP_SHRINK_DATA
} from '../app/appConstants'

export default (state, action) => {
  const newState = routerReducer(state, action)

  if (action.type === APP_SHRINK_DATA) {
    return {}
  }

  return newState
}
