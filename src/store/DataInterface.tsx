
//登录用户相关信息
export interface IUserInfo {
    name: string,
    role: string,
}

//显示页相关信息
export interface IPageInfo {
    name: string,
}

export interface IStateInfo {
    user: IUserInfo,
    curmod: IPageInfo,
}