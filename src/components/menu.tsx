import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { PageModule } from "../store/DataInterface";
import * as actionTypes from '../store/ActionTyps';
import { api_initmenu } from "../axios/api";
import * as CSS from 'csstype';
import { Menu } from 'antd';
import '../style/home.less'

const { SubMenu } = Menu;

interface IMenuProps {
    state: any,
    modelDispatch: (page: PageModule) => void;
}

const menuback: CSS.Properties = {
    background: 'none',
    borderBottom: 'none',
}

const MenuContent = ({ state, modelDispatch }: IMenuProps) => {
    const [menu, setMenu] = React.useState([]);
    const [curmod, setMod] = React.useState("");

    const initmenu = () => {
        if (state.user.name === "") {
            setMenu([]);
        } else {
            api_initmenu(null, (success, rsp) => {
                if (success && rsp != null) {
                    setMenu(rsp);
                }
            });
        }
    }

    useEffect(initmenu, [state.user]);

    const handleClick = (e: any) => {
        console.log('click ', e);
        setMod(e.key);
    };

    const getchildmenu = (param: any) => {
        if (param.sub && param.sub.length !== 0) {
            return (
                <SubMenu key={param.name} title={param.name}>
                    {
                        param.sub.map((item: any, index: any) => {
                            return getchildmenu(item);
                        })
                    }
                </SubMenu>
            );
        } else {
            return (
                <Menu.Item key={param.name} >
                    {param.name}
                </Menu.Item>
            );
        }
    }

    const context = () => {
        if (menu.length === 0) {
            return null;
        }
        let menutmp = menu;
        return (
            <Menu style={menuback} onClick={handleClick} selectedKeys={[curmod]} mode="horizontal">
                {
                    menutmp.map((item: any, index: any) => {
                        return getchildmenu(item);
                    })
                }
            </Menu >
        );
    }

    return (
        <>
            { context()}
        </>
    );
};

const mapStateToProps = (state: any) => {
    return { state };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        modelDispatch: (page: PageModule) => {
            dispatch({ type: actionTypes.MODULE_CHANGE, mod: page });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent);