import React from "react";
import { Link } from "react-router-dom";
import HeaderHamburger from "./headerHamburger";
import HeaderMainSponsors from "./headerMainSponsors";
import { stripRoot, hexToRgb, hexToRgba } from "../modules/formatters";

class HeaderIcon extends React.Component {
  render() {
    return (
      <a
        target="_blank"
        href={this.props.item.url}
        className="icon"
        style={{ backgroundColor: this.props.color }}
      >
        <svg viewBox="0 0 32 32">
          <use xlinkHref={`#icon-${this.props.item.icon}`} />
        </svg>
      </a>
    );
  }
}

class SiteHeader extends React.Component {
  render() {
    const rootLink = stripRoot(this.props.wp.root) + "/";

    const logoStyle = {
      backgroundColor: this.props.color.hex,
      backgroundImage: `url(${this.props.wp.logo})`
    };

    const iconStyle = {
      backgroundColor: hexToRgba(this.props.color.hex, 0.8)
    };

    return (
      <header className="site-header" id="site-header">
        <div className="site-header-fixed">
          <Link
            to={rootLink}
            className="site-logo"
            title="baglinjen"
            style={logoStyle}
          />
          <div className="header-icons">
            {this.props.wp.social.map((item, i) => (
              <HeaderIcon key={i} item={item} color={this.props.color.hex} />
            ))}
          </div>
          <HeaderMainSponsors posts={this.props.posts} />
          <HeaderHamburger />
        </div>
      </header>
    );
  }
}

export default SiteHeader;
