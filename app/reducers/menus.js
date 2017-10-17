export default function(state = [], action) {
  switch (action.type) {
    case "FETCHING_MENU":
      // if already in state, ignore
      if (state.find(menu => menu.slug == action.data.slug) !== undefined)
        return state;

      return [...state, { fetched: false, slug: action.data.slug }];
      break;

    case "FETCHED_MENU":
      return state.map(menu => {
        if (menu.slug === action.data.slug) {
          action.data.fetched = true;
          return Object.assign({}, action.data);
        } else return menu;
      });
      break;
  }
  return state;
}
