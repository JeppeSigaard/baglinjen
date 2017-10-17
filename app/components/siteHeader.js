import React from "react";
import { Link } from "react-router-dom";
import HeaderHamburger from "./headerHamburger";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    wp: state.wp
  };
};

class SiteHeader extends React.Component {
  render() {
    const rootLink = this.props.wp.root.replace(this.props.wp.server, "") + "/";

    return (
      <header className="site-header" id="site-header">
        <div className="site-header-fixed">
          <Link to={rootLink} className="site-logo" title="baglinjen">
            <img src={this.props.wp.logo} />
          </Link>
          <HeaderHamburger />
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps)(SiteHeader);
