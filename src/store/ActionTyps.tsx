import { IPageInfo, IUserInfo } from "./DataInterface";

export const USER_CHANGE = "USER_CHANGE"          //登录状态变更
export const PAGE_CHANGE = "PAGE_CHANGE"        //菜单选择-显示内容变更

export interface Action_User {
    type: string,
    user: IUserInfo,
}

export interface Action_Pagechg {
    type: string,
    page: IPageInfo,
}
