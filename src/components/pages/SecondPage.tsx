import { api_down, api_upload } from 'axios/api';
import React, { Component } from 'react';
class Main extends Component {
    componentDidMount() {
    }

    uploadfile = (e: React.ChangeEvent) => {
        let tar = e.target as HTMLInputElement;
        let file = tar.files![0];
        if (file) {
            api_upload(file, (type, rsp: any) => {
                if ( type === 'progress') {
                    console.log(rsp)
                }else if (type === 'success') {
                    console.log('上传成功')
                }else if (type === 'fail') {
                    console.log('上传失败')
                }
            });
        }
    }

    downfile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        api_down("SecureCRT_6.7.0.15.7z", (type, rsp: any) => {
            if ( type === 'progress') {
                console.log(rsp)                    
            }else if (type === 'success') {
                console.log('下载成功')
            }else if (type === 'fail') {
                console.log('下载失败')
            }
        });
    }

    render() {
        return (
            <div id="secPage" style={{ width: 400, height: 400 }}>
                <input type="file" id="input" onChange={this.uploadfile} ></input>
                <button type="button" onClick={this.downfile}>Down!</button>
            </div>
        );
    }
}

export default Main;