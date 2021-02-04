import React from "react";
import { connect } from "react-redux";
import { IPageInfo, IStateInfo } from "store/DataInterface";

interface ILoginProps {
    page: IPageInfo,
}

const Pages = ({ page }: ILoginProps) => {
    const switchPage = () => {
        let Tag: any = null;
        if (page.compent !== undefined && page.compent !== "") {
            try {
                Tag = require("./pages/" + page.compent);
            } catch (error) {
                Tag = require("./pages/ErrorPage");
            }

        } else {
            Tag = require("./pages/HomePage");
        }
        return Tag.default;
    }
    const compentName = () => {
        if (page.compent !== undefined && page.compent !== "") {
            return page.compent;
        } else {
            return "Home";
        }
    }
    const PageDetail = switchPage();
    const PageName = compentName();

    return (
        <PageDetail compentName={PageName} />
    );
}

const mapStateToProps = (state: IStateInfo) => {
    return {
        page: state.page === undefined ? { compent: "" } : state.page,
    }
}

export default connect(mapStateToProps)(Pages);