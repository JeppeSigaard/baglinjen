import React, { Component } from "react";

import { nl2p } from "../modules/formatters";

export default class Paragraph extends Component {
  render() {
    const content = this.props.content;
    return <div className="content-block content-block-p">{nl2p(content)}</div>;
  }
}
