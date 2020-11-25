import { combineReducers } from 'redux'
import * as actionTypes from './ActionTyps'

const initState = {
    user: {
        name: "",
        role: "",
    },
}

const user = (state = initState.user, action: actionTypes.Action_login) => {
    switch (action.type) {
        case actionTypes.LOGIN_CHANGE:
            return Object.assign({}, state, action.user);
    }
    return state;
}

export default combineReducers({
    user
})