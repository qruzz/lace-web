import React, { Component } from 'react';

import ObjDetect from '../../functions/objDetect';
import './Player.css';

export default class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: localStorage.getItem('@User'),
        };
    }

    componentDidMount() {
        console.log(this.state.user);
        if (!this.state.user) {
            this.props.history.push('/auth');
        } else {
            this.OBJ_DETECT = new ObjDetect();
        }
    }

    renderBoundingBoxesButton = () => {
        const handleOnClick = () => {
            this.setState({
                drawingBoxes: true,
            }, () => {
                this.OBJ_DETECT.drawBoundingBoxes(document);
            });
        };

        return (
            <button
                className={`control-button ${this.state.drawingBoxes ? 'active' : ''}`}
                onClick={handleOnClick}
            >
                Bounding Boxes
            </button>
        );
    }

    renderGridButton = () => {
        const handleOnClick = () => {
            this.setState({
                drawingGrid: !this.state.drawingGrid,
            }, () => {
                this.OBJ_DETECT.drawGrid(document);
            });
        };

        return (
            <button
                className={`control-button ${this.state.drawingGrid ? 'active' : ''}`}
                onClick={handleOnClick}
            >
                Grid
            </button>
        )
    }

    renderDensityMap = () => {
        const handleOnClick = () => {
            this.setState({
                drawingDensity: true,
            }, () => {
                this.OBJ_DETECT.drawDensity(document);
            });
        }

        return (
            <button
                className={`control-button ${this.state.drawDensity ? 'active' : ''}`}
                onClick={handleOnClick}
            >
                Density Map
            </button>
        );
    }

    renderPlayerContainer = () => {
        return (
            <div className="player-container">
                <div className="video-container">
                    <video
                        ref={(ref) => this.VIDEO = ref}
                        className="fullscreen-video"
                        id="video"
                        muted
                        playsInline
                        autoPlay
                    />
                </div>
                <div className="button-container">
                    {this.renderBoundingBoxesButton()}
                    {this.renderGridButton()}
                    {this.renderDensityMap()}   
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="main-container">
                {this.renderPlayerContainer()}
            </div>
        );
    }
}
