
//登录用户相关信息
export interface IUserInfo {
    name?: string,           //用户名
    role?: string,           //用户角色
}

//显示页相关信息
export interface IPageInfo {
    name?: string,           //页面对应菜单名称              
    compent?: string,        //页面对应组件路径(相对于components)
    sub?: IPageInfo[],       //子页面
}

//全局state
export interface IStateInfo {
    user: IUserInfo,        //当前登录的用户
    page: IPageInfo,        //当前显示的菜单页
}