export default function(state = { show: false }, action) {
  switch (action.type) {
    case "TOGGLE_HAMBURGER":
      const show = action.show !== undefined ? action.show : !state.show;
      return { show };
      break;
    case "@@router/LOCATION_CHANGE":
      return { show: false };
      break;
    default:
      return state;
  }
}
