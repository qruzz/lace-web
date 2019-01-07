import React, { Component } from 'react';
import PlayerClass from '../../functions/player';

import './Player.css';

export default class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            drawingBoxes: false,
        }

        // The update interval
		this.UPDATE_INTERVAL = 5000;
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('@User'));
		if (!user || user.error) {
			this.props.history.push('/auth');
        } else {

            // Create a new Player
            this.PLAYER = new PlayerClass(document);
    
            this.initPlayer();
            // setInterval(this.initPlayer, this.UPDATE_INTERVAL);
        }
    }

    initPlayer = () => {
        // Start the recursive player function
        this.PLAYER.startPlayer((result) => {
            console.log(result);
            this.setState({
                data: result,
            });
        });
    };

    renderBoundingBoxesButton = () => {
        const { data } = this.state;
        const handleOnClick = () => {
            this.setState({
                drawingBoxes: !this.state.drawingBoxes,
            }, () => {
                console.log('AFTER: ', this.state.drawingBoxes);
                if (this.state.drawingBoxes) {
                    console.log('hello');
                    this.PLAYER.drawBoundingBoxes(data.boundingBoxes);
                } else {
                    this.PLAYER.clearCanvas();
                }
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
        const { data } = this.state;
        if (data) {
            return (
                <div className="player-container">
                    <div className="video-container">
                        <img src={data.uri} className="video-image" />
                    </div>
                    <div className="button-container">
                        {this.renderBoundingBoxesButton()}
                        {this.renderGridButton()}
                        {this.renderDensityMap()}   
                    </div>
                </div>
            );
        }

        return (null);
    }

    render() {
        return (
            <div style={{backgroundColor: '#424242'}} className="main-container">
                {this.renderPlayerContainer()}
            </div>
        );
    }
}
