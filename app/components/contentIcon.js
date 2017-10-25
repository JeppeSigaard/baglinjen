import React, { Component } from "react";

export default class ContentIcon extends Component {
  render() {
    return (
      <div className="meta-icon" style={{ backgroundColor: this.props.bg }}>
        <svg viewBox="0 0 32 32">
          <use xlinkHref={`#icon-${this.props.type}`} />
        </svg>
      </div>
    );
  }
}
