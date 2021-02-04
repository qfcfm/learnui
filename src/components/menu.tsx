import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Menu } from 'antd';
import { IPageInfo, IStateInfo } from "store/DataInterface";
import * as actionTypes from 'store/ActionTyps';
import { api_initmenu } from "axios/api";

const { SubMenu } = Menu;
interface IMenuProps {
    state: IStateInfo,
    modelDispatch: (page: IPageInfo) => void;
}

const MenuContent = ({ state, modelDispatch }: IMenuProps) => {
    const [menu, setMenu] = React.useState([]);
    const [curmod, setMod] = React.useState("");

    const initmenu = () => {
        setMod("首页");
        if (state.user.name === undefined || state.user.name === "") {
            setMenu([]);
            modelDispatch({});
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
        modelDispatch(e.item.props["data-compent"]);
    };

    const getchildmenu = (param: IPageInfo, bTop: boolean = false) => {
        if (param.sub && param.sub.length !== 0) {
            if (bTop) {
                return (
                    <SubMenu key={param.name} title={param.name}>
                        {
                            param.sub.map((item: IPageInfo) => {
                                return getchildmenu(item);
                            })
                        }
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.ItemGroup key={param.name} title={param.name}>
                        {
                            param.sub.map((item: IPageInfo) => {
                                return getchildmenu(item);
                            })
                        }
                    </Menu.ItemGroup>
                );
            }
        } else {
            return (
                <Menu.Item key={param.name} data-compent={param}>
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
            <Menu onClick={handleClick} selectedKeys={[curmod]} mode="horizontal" >
                {
                    menutmp.map((item: IPageInfo) => {
                        return getchildmenu(item, true);
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

const mapStateToProps = (state: IStateInfo) => {
    return { state };
}

const mapDispatchToProps = (dispatch: Dispatch<actionTypes.Action_Pagechg>) => {
    return {
        modelDispatch: (page: IPageInfo) => {
            dispatch({ type: actionTypes.PAGE_CHANGE, page });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent);