import React from "react";

export default class SiteContent extends React.Component {
  render() {
    return (
      <div className="site-content" id="site-content">
        {this.props.children}
      </div>
    );
  }
}
