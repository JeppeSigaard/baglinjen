import { hexToRgb } from "../modules/formatters";

const initialState = {
  hex: "#999"
};

export default function(state = initialState, action) {
  if ("SET_THEME_COLOR" == action.type) {
    return { hex: action.hex };
    return state;
  }
  return state;
}
