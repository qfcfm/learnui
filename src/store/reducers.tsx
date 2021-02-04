import { combineReducers } from 'redux'
import * as actionTypes from './ActionTyps'
import { IPageInfo, IUserInfo } from './DataInterface';

const user = (state: IUserInfo = {}, action: actionTypes.Action_User) => {
    switch (action.type) {
        case actionTypes.USER_CHANGE:
            return action.user;
        default:
            break;
    }
    return state;
}

const page = (state: IPageInfo = {}, action: actionTypes.Action_Pagechg) => {
    switch (action.type) {
        case actionTypes.PAGE_CHANGE:
            return action.page;
        default:
            break;
    }
    return state;
}

export default combineReducers({
    user,
    page
})