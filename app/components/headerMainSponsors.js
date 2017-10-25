import React, { Component } from "react";
import { Link } from "react-router-dom";
import withMainSponsors from "../controllers/mainSponsors";
import { stripRoot } from "../modules/formatters";

class HeaderMainSponsors extends Component {
  render() {
    return (
      <div className="header-main-sponsors">
        {this.props.sponsors.map((item, i) => {
          return (
            <Link
              to={stripRoot(item.link)}
              key={i}
              className="header-main-sponsor"
              style={{ backgroundImage: `url(${item.settings.icon_light})` }}
            />
          );
        })}
      </div>
    );
  }
}

export default withMainSponsors(HeaderMainSponsors);
