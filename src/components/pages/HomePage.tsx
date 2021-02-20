import React, { Component } from 'react';
import * as Echarts from 'echarts';
const MainClass = 'vrv-home';
const MainMClass = 'vrv-home-main';

class Main extends Component {
    componentDidMount() {
        let ect = Echarts.init(document.getElementById(MainMClass) as HTMLCanvasElement);
    }
    render() {
        return (
            <div className={MainClass}>
                <canvas className={MainMClass} id={MainMClass} width="1400px" height="800px">
                </canvas>
            </div>
        );
    }
}

export default Main;