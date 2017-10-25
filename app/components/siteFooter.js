import React from "react";

export default class SiteFooter extends React.Component {
  render() {
    const description = this.props.wp.description;

    return (
      <footer className="site-footer" id="site-footer">
        <div className="site-description">{description}</div>
      </footer>
    );
  }
}
