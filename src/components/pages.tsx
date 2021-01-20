import React from "react";
import { connect } from "react-redux";
import { IPageInfo } from "../store/DataInterface";
import Home from "./pages/home";
import FirstPage from "./pages/firstpage";

interface ILoginProps {
    curmod: IPageInfo,
}

const Pages = ({ curmod }: ILoginProps) => {

    const switchmod = () => {
        switch (curmod.compent) {
            case "FirstPage":
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