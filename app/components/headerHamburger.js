import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as hamburger from "../actions/hamburger";

class HeaderHamburger extends React.Component {
  onClick(e) {
    e.preventDefault();
    this.props.toggleHamburger();
  }

  render() {
    return (
      <a
        onClick={this.onClick.bind(this)}
        href="#"
        className="header-hamburger"
      >
        <svg viewBox="0 0 32 32">
          {!this.props.hamburger.show && (
            <path d="M4 6.667h24q0.552 0 0.943 0.391t0.391 0.943-0.391 0.943-0.943 0.391h-24q-0.552 0-0.943-0.391t-0.391-0.943 0.391-0.943 0.943-0.391zM4 22.667h24q0.552 0 0.943 0.391t0.391 0.943-0.391 0.943-0.943 0.391h-24q-0.552 0-0.943-0.391t-0.391-0.943 0.391-0.943 0.943-0.391zM4 14.667h24q0.552 0 0.943 0.391t0.391 0.943-0.391 0.943-0.943 0.391h-24q-0.552 0-0.943-0.391t-0.391-0.943 0.391-0.943 0.943-0.391z" />
          )}

          {this.props.hamburger.show && (
            <path d="M22.957 23.758c-0.75 0.75-1.966 0.75-2.715 0l-4.242-4.848-4.242 4.846c-0.75 0.75-1.966 0.75-2.715 0-0.75-0.75-0.75-1.966 0-2.715l4.413-5.040-4.414-5.043c-0.75-0.75-0.75-1.965 0-2.715s1.965-0.75 2.715 0l4.243 4.85 4.242-4.85c0.75-0.75 1.965-0.75 2.715 0s0.75 1.966 0 2.715l-4.413 5.043 4.413 5.040c0.75 0.75 0.75 1.966 0 2.717z" />
          )}
        </svg>
      </a>
    );
  }
}

const mapStateToProps = state => {
  return { hamburger: state.hamburger };
};

const mapDispachToProps = dispatch => {
  return bindActionCreators(hamburger, dispatch);
};

export default connect(mapStateToProps, mapDispachToProps)(HeaderHamburger);
