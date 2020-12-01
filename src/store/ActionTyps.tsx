import { IPageInfo, IUserInfo } from "./DataInterface";

export const LOGIN_CHANGE = "LOGIN_CHANGE"          //登录状态变更
export const MODULE_CHANGE = "MODULE_CHANGE"        //菜单选择-显示内容变更

export interface Action_login {
    type: string,
    user: IUserInfo,
}

export interface Action_modchg {
    type: string,
    mod: IPageInfo,
}
