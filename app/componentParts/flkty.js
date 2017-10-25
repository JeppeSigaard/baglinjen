import React, { Component } from "react";
import Flickity from "../modules/flkty";

export default class FlickityWrapper extends Component {
  constructor() {
    super();
    this.state = {};
  }

  updateSelected() {
    const index = this.flkty.selectedIndex;
    this.setState({ selectedIndex: index });

    if (typeof this.props.select === "function") this.props.select(this);
  }

  nextSlide() {
    this.flkty.next();
    setTimeout(() => {
      this.updateSelected();
    }, 50);
  }

  prevSlide() {
    this.flkty.previous();
    setTimeout(() => {
      this.updateSelected();
    }, 50);
  }

  componentWillUnmount() {
    if (this.flkty) {
      this.flkty.off("cellSelect", this.updateSelected);
      this.flkty.destroy();
    }
  }

  componentDidMount() {
    if (this.props.name == null) return;
    if (this.props.children == null) return;

    const options = { ...this.props.options };

    this.flkty = new Flickity("#" + this.props.name, options);

    this.flkty.on("cellSelect", this.updateSelected.bind(this));
  }

  render() {
    if (this.props.name == null) return null;

    let classname = this.props.name;
    if (this.props.classes) classname += ` ${this.props.classes}`;

    return (
      <div style={this.props.style} className={classname} id={this.props.name}>
        {this.props.next && (
          <div className="next-btn" onClick={this.nextSlide.bind(this)}>
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#icon-chevron-left" />
            </svg>
          </div>
        )}
        {this.props.prev && (
          <div className="prev-btn" onClick={this.prevSlide.bind(this)}>
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#icon-chevron-right" />
            </svg>
          </div>
        )}
        {this.props.children}
      </div>
    );

    return null;
  }
}
