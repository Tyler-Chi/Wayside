import React, { Component } from 'react';
import { DotLoader } from 'react-spinners';
import './loading_icon.css';

class LoadingIcon extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { loading } = this.props;
    return (
      <div className="loading-icon">
        <DotLoader
          size={100}
          color={"#36d7b7"}
        />
        </div>
    );
  }
}

export default LoadingIcon;
