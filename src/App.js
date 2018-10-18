import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      support: null,
      mediaStream: null,
    };

    this.MEDIA_STREAM = null;
  }

  componentDidMount() {
    const support = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

    if (support) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: 608,
          height: 608,
        },
      }).then((result) => {
        console.log(result);

        this.setState({
          support: true,
          mediaStream: result,
        });
      });
    } else {
      this.setState({
        support: 'getUserMedia() IS NOT supported by this browser',
      });
    }
  }

  renderCameraInput = () => {
    if (this.state.support && this.state.mediaStream) {
        this.VIDEO.srcObject = this.state.mediaStream;
    }

    return (
      <h1>{this.state.support}</h1>
    )
  };

  render() {
    return (
      <div className="App">
        {this.renderCameraInput()}
        <video
          ref={(ref) => this.VIDEO = ref}
          controls
          muted
          playsInline
          autoPlay
          height="608"
          width="608"
          className="video-container"
        />
      </div>
    );
  }
}

export default App;
