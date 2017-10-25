import React, { Component } from "react";

export default class Image extends Component {
  render() {
    return (
      <div className="content-block content-block-image">
        <img src={this.props.image.large} />
      </div>
    );
  }
}
