import React, { Component } from "react";

export default class Heading2 extends Component {
  render() {
    const content = this.props.content;

    return (
      <div className="content-block">
        <h2>{content}</h2>
      </div>
    );
  }
}
