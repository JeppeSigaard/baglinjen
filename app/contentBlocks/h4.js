import React, { Component } from "react";

export default class Heading4 extends Component {
  render() {
    const content = this.props.content;
    return (
      <div className="content-block content-block-h4">
        <h4>{content}</h4>
      </div>
    );
  }
}
