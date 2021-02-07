import React, { Component } from 'react';
import * as echarts from 'echarts';

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
                fill: 'none',
                stroke: '#F00'
            },
            onmouseover: () => {
                console.log(circle.getPaintRect().x);
            },
            draggable: true,
        });
        zr.add(circle);
        circle.animate("shape",true);
    }
    render() {
        return (
            <div className="vrv-home">
                <div id="main" className="vrv-home-main">
                    {/* <canvas id="myCanvas" className="vrv-home-main-can">
                        Your browser does not support the canvas element.
                        <div id="123">
                            asdf
                        </div>
                    </canvas> */}
                </div>

            </div>
        );
    }
}

export default Main;