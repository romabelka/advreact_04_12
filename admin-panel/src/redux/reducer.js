import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule, formReducer as auth } from '../ducks/auth'

export default combineReducers({
  router,
  form: form.plugin({auth}),
  [authModule]: authReducer
})
