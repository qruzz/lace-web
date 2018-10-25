import React, { PureComponent } from 'react';
import CryptoJS from 'crypto-js';

import { connectUser } from '../../api.js';

import './Auth.css';

export default class Auth extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
        };
    }

    handleLogin = () => {
        connectUser({
            username: this.state.username,
            password: CryptoJS.SHA3(this.state.password),
        }).then((result) => {
            console.log(result);
        });
    }

    render() {
        return (
            <div className="main-container">
                
            </div>
        );
    }
}
