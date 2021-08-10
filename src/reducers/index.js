import userReducer from './userReducer'
import dataReducer from './dataReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
   users: userReducer,
   data: dataReducer
})

export default allReducers;