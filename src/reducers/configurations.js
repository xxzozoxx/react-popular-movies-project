import { FETCH_CONFIG_SUCCESS } from "../actions/types";
const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_CONFIG_SUCCESS:
      return action.data;
    default:
      return state;
  }
};
