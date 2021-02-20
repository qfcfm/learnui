import React, { Component } from 'react';
import * as echarts from 'echarts';

import imgbk from 'style/img/bxy.png';
const MainClass = 'vrv-firstpage';
const CanVClass = 'vrv-firstpage-main';

class Main extends Component {
    index: number;
    myChart: echarts.ECharts | undefined;
    data: (string | number)[][];
    constructor(props: any) {
        super(props);
        this.index = 0;
        this.data = [[102, 100, '111'], [200, 200, '222'], [300, 300, '333'], [400, 400, '444']];
    }
    getImgStyle(item: Array<any>, index: number) {
        return {
            image: imgbk,
            x: item[0],
            y: item[1],
            width: 20,
            height: 20,
            sx: 10 + index * 10,
            sy: 10,
            sWidth: 20,
            sHeight: 20,
        };
    }
    getImgGroup(item: Array<any>, index: number) {
        let item1 = [item[0], item[1]];
        let item2 = [item[0] + 20, item[1]];
        return [
            {
                type: 'image',
                style: this.getImgStyle(item1, 0),
            },
            {
                type: 'image',
                style: this.getImgStyle(item2, index),
            },
            {
                type: 'text',
                style: {
                    text: item[2],
                    fill: '#FFF',
                    x: item[0] + 10,
                    y: item[1] + 4,
                    font: '1em "Microsoft YaHei", sans-serif'
                }
            }
        ];
    }
    step = (timestap: number) => {
        this.index! += 1;
        if (this.index > 10) {
            this.index = 0;
        }
        let option = {
            lazyUpdate: true,
            animation : false,
            graphic: this.data.map(
                (item) => {
                    return {
                        type: 'group',
                        draggable: true,
                        ondragend: (eventPacket: any) => {
                            let x = eventPacket.target.getBoundingRect();
                            x.applyTransform(eventPacket.target.transform);
                            item[3] = x.x;
                            item[4] = x.y;
                        },
                        children: this.getImgGroup(item, this.index),
                    };
                }
            ),
        };
        this.myChart!.setOption(option);
    }

    click = (e: any) => {
        console.log(this.data);
    }
    componentDidMount() {
        this.myChart = echarts.init(document.getElementById(CanVClass) as HTMLCanvasElement);
        this.step(10);
        setInterval(this.step, 200);
    }
    render() {
        return (
            <div className={MainClass}>
                <canvas className={CanVClass} id={CanVClass} width='1400px' height='800px'>
                </canvas>
                <button onClick={this.click}>123123</button>
            </div>
        );
    }
}

export default Main;