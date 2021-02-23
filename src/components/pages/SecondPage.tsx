import { api_down, api_upload } from 'axios/api';
import React, { Component } from 'react';
class Main extends Component {
    componentDidMount() {
    }

    uploadfile = (e: React.ChangeEvent) => {
        let tar = e.target as HTMLInputElement;
        let file = tar.files![0];
        if (file) {
            api_upload(file, (bsuc, rsp: any) => {

            });
        }
    }

    downfile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        api_down("SecureCRT_6.7.0.15.7z", (bsuc, rsp: any) => {

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