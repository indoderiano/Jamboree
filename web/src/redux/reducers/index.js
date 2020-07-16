import AuthReducer from './AuthReducer'
import StoreReducer from './StoreReducer'
import TransactionReducer from './TransactionReducer'
import { combineReducers } from 'redux'

export default combineReducers({
    Auth: AuthReducer,
    Store: StoreReducer,
    Transaction: TransactionReducer
})