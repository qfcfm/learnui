import React from 'react';
import {HashRouter, Switch, Route } from 'react-router-dom';
import Home from "../components/home";

export const QFRouter = () => {
    return (
        <div>
           <HashRouter>
               <Switch>
                   <Route exact path="/" component={Home} ></Route>
               </Switch>
           </HashRouter>
        </div>
    );
}

export default QFRouter;