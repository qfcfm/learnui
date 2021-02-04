import axios, { CancelToken, CancelTokenSource } from 'axios';
import { IUserInfo } from 'store/DataInterface';

function post1(api: string, data: any, func: (success: boolean, rsp: string) => void) {
    return axios.post(api, data)
        .then(
            (rsp) => {
                func(rsp.status === 200, rsp.data)
            }
        ).catch(
            (err) => {
                func(false, err.message)
            }
        );
}


function post2(api: string, data: any, token: CancelToken, func: (success: boolean, rsp: string) => void) {
    return axios.post(api, data, { cancelToken: token })
        .then(
            (rsp) => {
                func(rsp.status === 200, rsp.data)
            }
        ).catch(
            (err) => {
                func(false, err.message)
            }
        );
}

/**
 * 
 * @param data 
 * @param func 
 * 
    { name: "cfm", role: "secadmin" } 
 */
export const api_init = (data: any, func: (success: boolean, rsp: IUserInfo | null) => void) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    post2("/API/init", data, source.token, (bSuc, json) => {
        // //调用返回成功
        // if (bSuc && typeof json === "object") {
        //     func(true, json);
        // } else {
        //     //调用返回失败
        //     func(false, null);
        // }
        func(true, { name: "cfm", role: "secadmin" });
    });
    return source;
}

/**
 * 
 * @param data 
 * @param func 
 * 
    { name: "cfm", role: "secadmin" }
 */
export const api_login = (data: any, func: (success: boolean, rsp: IUserInfo | null) => void) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    post2("/API/login", data, source.token, (bSuc, json) => {
        // //调用返回成功
        // if (bSuc && typeof json === "object") {
        //     func(true, json);
        // } else {
        //     //调用返回失败
        //     func(false, null);
        // }
        func(true, { name: "cfm", role: "secadmin" });
    });
    return source;
}

export const api_logout = (data: any, func: (success: boolean) => void) => {
    post1("/API/logout", data, (bSuc, json) => {
        // //调用返回成功
        // if (bSuc) {
        //     func(true);
        // } else {
        //     //调用返回失败
        //     func(false);
        // }
        func(true);
    });
}

export const api_initmenu = (data: any, func: (success: boolean, rsp: any) => void) => {
    post1("/API/initmenu", data, (bSuc, json) => {
        let menu = [
            { name: "首页", compent: "HomePage" },
            {
                name: "功能1",
                sub: [
                    {
                        name: "分组1", sub: [
                            { name: "开发1", compent: "FirstPage" },
                            { name: "开发2", compent: "SecondPage" }
                        ]
                    },
                    {
                        name: "分组2", sub: [
                            { name: "开发3", compent: "ThirdPage" },
                            { name: "开发4", compent: "FourPage" }
                        ]
                    }
                ]
            },
            {
                name: "功能2",
                sub: [
                    { name: "测试1", compent: "APage" },
                    { name: "测试2", compent: "BPage" }
                ]
            }
        ];
        func(true, menu);
    });
}

export const api_cancel = (source: CancelTokenSource | null) => {
    if (source != null) {
        source.cancel("abort");
    }
}