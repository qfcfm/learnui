import React from 'react';
import MD5 from 'crypto-js/md5';
import { CancelTokenSource } from 'axios';
import { api_cancel, api_login } from 'axios/api';
import { Modal, Form, Input, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { IUserInfo } from 'store/DataInterface';
import * as qf from 'utils/common';

interface ILoginProps {
    visible: boolean;
    doShowLogin: (bShow: boolean) => void;
    doLogin: (user: IUserInfo) => void;
}

const openNotificationWithIcon = (txt: string) => {
    notification.warn({
        message: '提示',
        description: txt,
    });
};

const Login = ({ visible, doShowLogin, doLogin }: ILoginProps) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [form] = Form.useForm();

    let source: CancelTokenSource | null = null;
    const setSource = (value: CancelTokenSource | null) => {
        source = value;
    }
    //调用登录接口
    const invokeLogin = (param: any) => {
        setConfirmLoading(true);
        param.password = MD5(param.password).toString();
        let source = api_login(param, (success, rsp) => {
            if (success && rsp) {
                form.resetFields();
                doLogin(rsp);
                doShowLogin(false);
            } else {
                openNotificationWithIcon("登录失败！");
            }
            setConfirmLoading(false);
        });
        setSource(source);
    }
    //提交登录
    const handleOk = () => {
        form.validateFields()
            .then(values => {
                invokeLogin(values);
            }).catch(info => {
            });
    };
    //取消登录
    const handleCancel = () => {
        form.resetFields();
        api_cancel(source);
        setSource(null);
        doShowLogin(false);
        setConfirmLoading(false);
    };

    return (
        <Modal
            title="登录"
            centered={true}
            bodyStyle={{ padding: '24px 24px 5px 24px' }}
            maskClosable={false}
            width={350}
            destroyOnClose={true}
            visible={visible}
            confirmLoading={confirmLoading}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                size={"middle"}
                form={form}
                initialValues={{ remember: true }}
            >
                <Form.Item name="username" rules={[
                    { required: true, message: '请输入用户名!' },
                    {
                        validator: (_, value) => {
                            return qf.ValidatePass(value) ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))
                        }
                    }
                ]} >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item name="password" rules={[
                    { required: true, message: '请输入密码!' }
                ]} >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Login;
