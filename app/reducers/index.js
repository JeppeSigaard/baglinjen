import { combineReducers } from "redux";

import hamburger from "./hamburger";
import posts from "./posts";
import menus from "./menus";
import video from "./video";
import categories from "./categories";
import color from "./color";
import wp_settings from "./wp_settings";

import { routerReducer, push } from "react-router-redux";

const rootReducer = combineReducers({
  hamburger,
  posts,
  menus,
  video,
  color,
  categories,
  router: routerReducer,
  wp: wp_settings
});

export default rootReducer;
