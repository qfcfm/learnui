import axios, { CancelToken, CancelTokenSource } from 'axios';
import { User } from '../store/DataInterface';

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
export const api_init = (data: any, func: (success: boolean, rsp: User | null) => void) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    post2("/API/init", data, source.token, (bSuc, json) => {
        //调用返回成功
        if (bSuc && typeof json === "object") {
            func(true, json);
        } else {
            //调用返回失败
            func(false, null);
        }
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
export const api_login = (data: any, func: (success: boolean, rsp: User | null) => void) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    post2("/API/login", data, source.token, (bSuc, json) => {
        //调用返回成功
        if (bSuc && typeof json === "object") {
            //let jsontmp = '{"status": "success","user": { "name": "cfm", "role": "secadmin" }}';
            //let jobj = JSON.parse(jsontmp);
            func(true, json);
        } else {
            //调用返回失败
            func(false, null);
        }

    });
    return source;
}

export const api_logout = (data: any, func: (success: boolean) => void) => {
    post1("/API/logout", data, (bSuc, json) => {
        //调用返回成功
        if (bSuc) {
            func(true);
        } else {
            //调用返回失败
            func(false);
        }

    });
}

export const api_cancel = (source: CancelTokenSource | null) => {
    if (source != null) {
        source.cancel("abort");
    }
}