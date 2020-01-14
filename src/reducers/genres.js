import { FETCH_GENRES_SUCCESS } from "../actions/types";

const initState = [];
export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_GENRES_SUCCESS:
      return action.data;
    default:
      return state;
  }
};
