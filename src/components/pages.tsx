import React from "react";
import { connect } from "react-redux";
import { IPageInfo } from "../store/DataInterface";
import FirstPage from "./pages/firstpage";
import Home from "./pages/home";

interface ILoginProps {
    curmod: IPageInfo,
}

const Pages = ({ curmod }: ILoginProps) => {

    const switchmod = () => {
        switch (curmod.name) {
            case "1-1-1":
                return <FirstPage />;
            default:
                return <Home />
        }
    }
    return (
        <>
            {switchmod()}
        </>
    );
}

const mapStateToProps = (state: any) => {
    return {
        curmod: state.curmod,
    }
}

export default connect(mapStateToProps)(Pages);