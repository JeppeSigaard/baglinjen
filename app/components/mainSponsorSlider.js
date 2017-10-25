import React, { Component } from "react";
import { Link } from "react-router-dom";
import withMainSponsors from "../controllers/mainSponsors";
import Flkty from "../componentParts/flkty";
import { stripRoot } from "../modules/formatters";

const options = {
  pageDots: false,
  prevNextButtons: false
};

class MainSponsorSlider extends Component {
  render() {
    return (
      <Flkty options={options} name="main-sponsor-slider">
        {this.props.sponsors.map((item, i) => {
          console.log(item);
          const bg = "";
          return <div key={i} className="main-sponsor-slide" data-bg={bg} />;
        })}
      </Flkty>
    );
  }
}

export default withMainSponsors(MainSponsorSlider);
