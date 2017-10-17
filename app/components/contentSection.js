import React, { Component } from "react";

export default class ContentSection extends Component {
  render() {
    return (
      <section className="content-section" id="content-section">
        {this.props.children}
      </section>
    );
  }
}
