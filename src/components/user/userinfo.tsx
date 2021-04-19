import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actionTypes from 'store/ActionTyps';
import { api_init, api_logout } from 'axios/api';
import { Button, Space, Menu, Dropdown, notification } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import * as CSS from 'csstype';
import { IStateInfo, IUserInfo } from 'store/DataInterface';
import qf_websocket from 'utils/websocket';
import Login from './login';

interface IUserInfoProps {
    user: IUserInfo,
    loginDispatch: (user: IUserInfo) => void;
}

const username: CSS.Properties = {
    color: 'white',
}
const usermenu: CSS.Properties = {
    marginLeft: '8px',
}

const websocket = new qf_websocket();

const openNotificationWithIcon = (txt: string) => {
    notification.warn({
        message: '提示',
        description: txt,
    });
};

const UserInfo = ({ user, loginDispatch }: IUserInfoProps) => {
    const [showLogin, setshowLogin] = React.useState(false);
    /**
     * 用户初始化
     */
    const inituser = () => {
        api_init(null, (success, rsp) => {
            if (success && rsp) {
                loginchg(rsp);
            }
        });
    }
    //第二个参数传入空,表示只执行一次inituser
    useEffect(inituser, []);
    /**
     * //用户登录状态变化
     * @param user 
     */
    const loginchg = (user: IUserInfo) => {
        console.info("用户登录信息变化!");
        loginDispatch(user);
        if (user.name) {
            websocket.close();
            websocket.connection((msg: string) => {
                let jsonObj = JSON.parse(msg);
                if (jsonObj) {
                    switch (jsonObj.type) {
                        case "userloginsite":
                            //异地登录
                            loginDispatch({});
                            openNotificationWithIcon('账号异地登录');
                            break;
                        case "userlogout":
                            //此处由用户主动调用退出登录,所以不需要处理
                            break;
                        case "timeout":
                            //会话超时
                            loginDispatch({});
                            openNotificationWithIcon('会话过期');
                            break;
                    }
                }
            });
        } else {
            websocket.close();
        }
    }
    //点击登录按钮
    const hanldeLogin = () => {
        setshowLogin(true);
    }
    //调用退出登录
    const hanldeLogout = () => {
        api_logout(null, (success) => {
            loginchg({});
        });
    }
    function handleMenuClick(e: any) {
        switch (e.key) {
            case "2":
                hanldeLogout();
                break;
            default:
                break;
        }
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">
                修改密码
            </Menu.Item>
            <Menu.Item key="2">
                退出登录
            </Menu.Item>
        </Menu>
    );
    const userInfo = () => {
        if (user.name) {
            return (
                <Space align="center">
                    <Button className="login"><span></span></Button>
                    <Dropdown overlay={menu} >
                        <a href="void" onClick={e => e.preventDefault()} style={username}>
                            {user.name}<DownOutlined style={usermenu} />
                        </a>
                    </Dropdown>
                </Space>
            )
        } else {
            return (
                <Button className="login" title='登录' onClick={hanldeLogin}><span></span></Button>
            );
        }
    }
    return (
        <>
            {userInfo()}
            <Login visible={showLogin} doShowLogin={setshowLogin} doLogin={loginchg}></Login>
        </>
    );
};

const mapStateToProps = (state: IStateInfo) => {
    return {
        user: state.user === undefined ? {} : state.user,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<actionTypes.Action_User>) => {
    return {
        loginDispatch: (user: IUserInfo) => {
            dispatch({ type: actionTypes.USER_CHANGE, user });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);