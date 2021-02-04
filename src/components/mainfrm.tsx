import React from 'react';
import { ConfigProvider, Layout, Space } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import FullScreen from './common/fullscreen';
import Login from './user/login';
import MenuContent from './menu';
import Pages from './pages';

const { Header, Content } = Layout;
const MainFrame = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <Layout className="top-layout">
                <Header className="top-header" >
                    <div className="top-logo" />
                    <div className="top-menu" >
                        <MenuContent />
                    </div>
                    <div className="top-space" >
                        <Space align="center" >
                            <Login />
                            <FullScreen />
                        </Space>
                    </div>
                </Header>
                <Content>
                    <Pages />
                </Content>
            </Layout>
        </ConfigProvider>
    );
}

export default MainFrame;