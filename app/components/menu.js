import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as menus from "../actions/menus";

const mapStateToProps = state => {
  return {
    menus: state.menus,
    wp: state.wp
  };
};

const mapDispachToProps = dispatch => {
  return bindActionCreators({ ...menus }, dispatch);
};

class NavMenu extends Component {
  fetchMenu(slug) {
    const menu = this.props.menus.find(menu => menu.slug === slug);
    if (menu === undefined) {
      this.props.fetchMenu(slug);
    }

    return menu;
  }

  generateMenuItems(items) {
    if (items === undefined) return;
    return items.map((item, i) => {
      const submenu =
        item.children.length > 0
          ? this.generateMenuItems(item.children)
          : false;
      const relative_url = item.url.replace(this.props.wp.server, "");

      return (
        <li key={i}>
          <NavLink to={relative_url} activeClassName="current">
            {item.title}
          </NavLink>
          {submenu !== false && <ul className="sub-menu">{submenu}</ul>}
        </li>
      );
    });
  }

  render() {
    if (this.props.location == null) return null;
    const menu = this.fetchMenu(this.props.location);
    const menuItems =
      menu !== undefined ? this.generateMenuItems(menu.items) : undefined;

    return (
      <ul className={`menu location-${this.props.location}`}>
        {menuItems !== undefined && menuItems}
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispachToProps)(NavMenu);
