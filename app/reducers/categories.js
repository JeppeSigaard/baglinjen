export default function(state = [], action) {
  switch (action.type) {
    case "FETCHED_CATEGORIES":
      const filtered = action.data.filter(item => {
        if (state.find(cat => cat.id === item.id) !== undefined) return false;
        return true;
      });

      return state.concat(filtered);

      break;

    case "FETCHING_CATEGORY":
      if (state.find(cat => cat.id == action.id) !== undefined) return state;

      return [...state, { fetched: false, id: action.id }];
      break;

    case "FETCHED_CATEGORY":
      return state.map(cat => {
        if (cat.id === action.data.id) {
          action.data.fetched = true;
          return { ...action.data };
        } else return cat;
      });
      break;
  }
  return state;
}
