import React, { Component } from 'react';
import { Button } from 'antd';
import { ExpandOutlined } from '@ant-design/icons';
let isFullScreen: boolean = false;

export default class FullScreen extends Component<any>{

    componentDidMount = () => {
        this.watchFullScreen();
    }

    handleFullScreen = () => {
        if (!isFullScreen) {
            this.requestFullScreen();
        } else {
            this.exitFullscreen();
        }
    };

    //进入全屏
    requestFullScreen = () => {
        let de: any
        de = document.body;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    };
    //退出全屏
    exitFullscreen = () => {
        var de: any = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    };
    //监听事件
    watchFullScreen = () => {
        let de: any
        de = document;
        document.addEventListener(
            "fullscreenchange",
            () => { isFullScreen = de.fullscreen; },
            false
        );
        document.addEventListener(
            "webkitfullscreenchange",
            () => { isFullScreen = de.webkitIsFullScreen; },
            false
        );
        document.addEventListener(
            "mozfullscreenchange",
            () => { isFullScreen = de.mozFullScreen; },
            false
        );
        window.addEventListener(
            "keydown",
            (e) => {
                if ( e.key === 'F11') {
                    e.preventDefault()
                    if (!isFullScreen) {
                        this.requestFullScreen();
                    } else {
                        this.exitFullscreen();
                    }
                }
            },
            true)// 监听按键事件
    };

    render() {
        return <Button className="full" title="全屏/退出全屏" icon={<ExpandOutlined />} onClick={this.handleFullScreen}></Button>
    }

}
