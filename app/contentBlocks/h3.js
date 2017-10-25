import React, { Component } from "react";

export default class Heading3 extends Component {
  render() {
    const content = this.props.content;

    return (
      <div className="content-block content-block-h3">
        <h3>{content}</h3>
      </div>
    );
  }
}
