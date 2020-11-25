import React from 'react';
import { ConfigProvider, Layout, Space } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import '../style/home.less'
import FullScreen from './common/fullscreen';
import Login from './user/login';

const { Header, Content } = Layout;

const Home = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <Layout className="top-layout">
                <Header className="top-header" >
                    <div className="top-logo" />
                    <div className="top-space" >
                        <Space align="center" >
                            <Login />
                            <FullScreen />
                        </Space>
                    </div>
                </Header>
                <Content >
                </Content>
            </Layout>
        </ConfigProvider>
    );
}

export default Home;