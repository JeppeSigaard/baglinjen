import React, { Component } from "react";

import CategorySlider from "./categorySlider";

class HomeCategorySection extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <section className="home-categories">
        {this.props.categories.map((item, i) => (
          <CategorySlider cat={item} key={i} />
        ))}
      </section>
    );
  }
}

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as categories from "../actions/categories";

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispachToProps = dispatch => {
  return bindActionCreators({ ...categories }, dispatch);
};

export default connect(mapStateToProps, mapDispachToProps)(HomeCategorySection);
