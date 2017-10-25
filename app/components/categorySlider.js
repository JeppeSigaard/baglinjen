import React, { Component } from "react";
import { Link } from "react-router-dom";
import { stripRoot } from "../modules/formatters";

import FlickityWrapper from "../componentParts/flkty";
import PostBox from "./postBox";

const options = {
  prevNextButtons: false,
  pageDots: false,
  cellSelector: ".post-box",
  cellAlign: "left",
  freeScroll: true,
  //wrapAround: true
  contain: true
};

export default class CategorySlider extends Component {
  componentDidMount() {}

  render() {
    const cat = this.props.cat;

    if (cat.count < 1) return null;

    return (
      <FlickityWrapper
        classes="cat-slider"
        options={options}
        name={`cat-slider-${cat.slug}`}
        next
        style={{ fill: cat.color }}
      >
        <header
          style={{ backgroundColor: cat.color }}
          className="cat-slider-header"
        >
          <svg viewBox="0 0 32 32">
            <use xlinkHref="#icon-logo" />
          </svg>
          <span className="cat-slider-header-name">{cat.name}</span>
          <span className="cat-slider-header-count">{`${cat.count} indlæg`}</span>
        </header>
        {this.props.cat.posts.map((post, i) => {
          return <PostBox post={post.link} key={i} />;
        })}
      </FlickityWrapper>
    );
  }
}
