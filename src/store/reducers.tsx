import { combineReducers } from 'redux'
import * as actionTypes from './ActionTyps'
import { IStateInfo } from './DataInterface';

const initState: IStateInfo = {
    //用户信息
    user: {
        name: "",
        role: "",
    },
    //当前content显示页        
    curmod: {
        name: "",
    },
}

const user = (state = initState.user, action: actionTypes.Action_login) => {
    switch (action.type) {
        case actionTypes.LOGIN_CHANGE:
            return Object.assign({}, state, action.user);
    }
    return state;
}

const curmod = (state = initState.curmod, action: actionTypes.Action_modchg) => {
    switch (action.type) {
        case actionTypes.MODULE_CHANGE:
            return Object.assign({}, state, action.mod);
        default:
            break;
    }
    return state;
}

export default combineReducers({
    user,
    curmod
})