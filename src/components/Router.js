import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../modules/Landing';
import Auth from '../modules/Auth';
import Streamer from '../modules/Streamer';
import Player from '../modules/Player';

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                {/* <Route exact path="/" component={Landing} /> */}
                <Route path="/auth" component={Auth} />
                <Route path="/streamer" component={Streamer} />
                <Route path="/player" component={Player} />
            </div>
        </BrowserRouter>
    );
};

export default Router;
