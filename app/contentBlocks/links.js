import React, { Component } from "react";

export default class LinkBox extends Component {
  render() {
    return (
      <div className="content-block content-block-links">
        <ul
          className="link-box"
          style={{ borderTop: `2px solid ${this.props.color.hex}` }}
        >
          <h3 className="link-box-heading">Links til andre sider</h3>
          {this.props.links.map((link, i) => {
            return (
              <li key={i}>
                <a href={link.url} target="_blank">
                  {link.label}
                  <svg viewBox="0 0 32 32">
                    <use xlinkHref="#icon-chevron-right" />
                  </svg>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
