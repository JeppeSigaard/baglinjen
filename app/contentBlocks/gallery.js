import React, { Component } from "react";

import { hexToRgba } from "../modules/formatters";
import Flkty from "../componentParts/flkty";

const options = {
  prevNextButtons: false,
  pageDots: false,
  wrapAround: true,
  contain: true,
  cellSelector: ".image"
};

export default class Gallery extends Component {
  constructor() {
    super();
    this.state = { index: 1 };
  }

  onSelect(data) {
    const i =
      data.state.selectedIndex !== undefined ? 1 + data.state.selectedIndex : 2;
    this.setState({ index: i });
  }

  render() {
    const color = this.props.color.hex;
    return (
      <div className="content-block content-block-gallery">
        <Flkty
          next
          style={{
            fill: color,
            borderTop: `2px solid ${color}`,
            borderBottom: `2px solid ${color}`
          }}
          select={this.onSelect.bind(this)}
          options={options}
          classes="gallery"
          name={`article-gallery-${this.props.index}`}
        >
          <div
            className="gallery-count"
            style={{
              backgroundColor: hexToRgba(color, 0.6)
            }}
          >
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#icon-gallery" />
            </svg>
            <span>{`${this.state.index} / ${this.props.block.images
              .length}`}</span>
          </div>
          {this.props.block.images.map((img, i) => {
            return (
              <div
                style={{ backgroundImage: `url(${img.large})` }}
                key={i}
                className="image"
              />
            );
          })}
        </Flkty>
      </div>
    );
  }
}
