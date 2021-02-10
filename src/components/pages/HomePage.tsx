import React, { Component } from 'react';
import * as echarts from 'echarts';

import imgbk from 'style/img/bxy.png';

class Main extends Component {
    componentDidMount() {
        let myChart = echarts.init(document.getElementById('main') as HTMLDivElement);
        let zr = myChart.getZr();
        let circle = new echarts.graphic.Circle({
            shape: {
                cx: 150,
                cy: 50,
                r: 40
            },
            style: {
                fill: 'red',
            },
            onmouseover: () => {
            },
            draggable: true,
        });
        zr.add(circle);

        let img = new Image();
        img.src = imgbk;

        myChart.getRenderedCanvas({backgroundColor: "blue"}) as HTMLCanvasElement;
        img.onload = () =>{
        }
    }
    render() {
        return (
            <div className="vrv-home">
                <div id="main" className="vrv-home-main">
                </div>
            </div>
        );
    }
}

export default Main;