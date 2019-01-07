import React, { PureComponent } from 'react';
import CryptoJS from 'crypto-js';

import { connectUser } from '../../api.js';

import './Auth.css'; 

const logo = require('../../resources/logo-white.svg');

export default class Auth extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            username: undefined,
            password: undefined,
        };
    }

    renderLoginButton = () => {
        const { username, password } = this.state;
        const handleLogin = () => {
            connectUser({
                username: username,
                password: password ? CryptoJS.SHA3(this.state.password).toString() : undefined,
            }).then((result) => {
                console.log(result);
                if (!result.error) {
                    localStorage.setItem('@User', JSON.stringify(result));
                    if (this.props.history.location.state === 'stream') {
                        this.props.history.push('/streamer');
                    } else {
                        this.props.history.push('/player');
                    }
                } else {
                    console.log(result);
                }
            });
        };

        return (
            <button
                className="login-button"
                onClick={handleLogin}
            >
                Connect
            </button>
        );
    }

    render() {
        return (
            <div className="auth-container">
                <img
                    className="brand-logo"
                    alt='lace'
                    src={logo}
                />
                <input
                    className="auth-input"
                    placeholder="username"
                    value={this.state.username}
                    onChange={(event) => {
                        this.setState({
                            username: event.target.value,
                        });
                    }}
                />
                <input
                    className="auth-input"
                    placeholder="password"
                    type="password"
                    value={this.state.password}
                    onChange={(event) => {
                        this.setState({
                            password: event.target.value,
                        });
                    }}
                />
                {this.renderLoginButton()}
            </div>
        );
    }
}
