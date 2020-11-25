import { Modal, Button, Form, Input, Space, Menu, Dropdown, notification } from 'antd';
import { UserOutlined, LockOutlined, DownOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import MD5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { CancelTokenSource } from 'axios';
import { api_cancel, api_init, api_login, api_logout } from '../../axios/api';
import * as actionTypes from '../../store/ActionTyps';
import { User } from '../../store/DataInterface';
import { Dispatch } from 'redux';
import * as CSS from 'csstype';
import qf_websocket from './websocket';

interface ILoginProps {
    user: User,
    loginDispatch: (user: User) => void;
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

const Login = ({ user, loginDispatch }: ILoginProps) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [form] = Form.useForm();
    const [init] = React.useState(true);

    let source: CancelTokenSource | null = null;

    const setSource = (value: CancelTokenSource | null) => {
        source = value;
    }

    const loginchg = (user: User) => {
        console.info("用户登录信息变化!");
        loginDispatch(user);
        if (user.name !== "") {
            websocket.close();
            websocket.connection((msg: string) => {
                let jsonObj = JSON.parse(msg);
                if (jsonObj) {
                    switch (jsonObj.type) {
                        case "userloginsite":
                            //异地登录
                            loginDispatch({ name: "", role: "" });
                            openNotificationWithIcon('账号异地登录');
                            break;
                        case "userlogout":
                            //此处由用户主动调用退出登录,所以不需要处理
                            break;
                        case "timeout":
                            //会话超时
                            loginDispatch({ name: "", role: "" });
                            openNotificationWithIcon('会话过期');
                            break;
                    }
                }
            });
        } else {
            websocket.close();
        }
    }

    const inituser = () => {
        api_init(null, (success, rsp) => {
            if (success && rsp != null) {
                loginchg(rsp);
            }
        });
    }

    useEffect(inituser, [init]);

    //调用登录接口
    const Login = (param: any) => {
        setConfirmLoading(true);
        param.password = MD5(param.password).toString();
        let source = api_login(param, (success, rsp) => {
            if (success && rsp != null) {
                form.resetFields();
                loginchg(rsp);
                setVisible(false);
            } else {
                alert("登录失败！");
            }
            setConfirmLoading(false);
        });
        setSource(source);
    }

    //调用退出登录
    const LogOut = () => {
        api_logout(null, (success) => {
            loginchg({ name: "", role: "" });
        });
    }
    //提交登录
    const handleOk = () => {
        form.validateFields()
            .then(values => {
                Login(values);
            }).catch(info => {
            });
    };

    //点击登录按钮
    const showModal = () => {
        setVisible(true);
    };

    //取消登录
    const handleCancel = () => {
        form.resetFields();
        api_cancel(source);
        setSource(null);
        setVisible(false);
        setConfirmLoading(false);
    };

    function handleMenuClick(e: any) {
        switch (e.key) {
            case "2":
                LogOut();
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
        if (user != null && user.name !== "") {
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
                <Button className="login" title='登录' onClick={showModal}><span></span></Button>
            );
        }
    }

    const ll = userInfo();
    return (
        <>
            {ll}
            <Modal
                title="登录"
                centered={true}
                maskClosable={false}
                width={350}
                destroyOnClose={true}
                visible={visible}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    size={"large"}
                    form={form}
                    initialValues={{ remember: true }}
                >
                    <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]} >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]} >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginDispatch: (user: User) => {
            dispatch({ type: actionTypes.LOGIN_CHANGE, user });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);