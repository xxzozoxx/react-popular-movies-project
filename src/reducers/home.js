import { MOVIES_CATEGORIES, MOVIE_LANG_PARAMETER_US } from "../constants";
import {
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
    SEARCH_MOVIE,
    SELECT_CATEGORY,
    SELECT_LANGUAGE,
    RESET_SEARCH
} from '../actions/types'

const initState = {
    movies: [],
    error: null,
    searchQuery: "",
    selectedCategory: MOVIES_CATEGORIES.POPULAR,
    selectedLanguage: MOVIE_LANG_PARAMETER_US
  };
  export default (state = initState, action) => {
    switch (action.type) {
      case FETCH_MOVIES_SUCCESS:
        return { ...state, movies: action.data };
      case FETCH_MOVIES_FAILURE:
        return { ...state, error: action.error };
        case SEARCH_MOVIE:
            return {
              ...state,
              searchQuery: action.query,
              searchResults: [],
              searchError: null
            };
        case RESET_SEARCH:
            return {
               ...state,
               searchQuery: "",
               searchResults: [],
               searchError: null
                };    
      case SELECT_LANGUAGE:
        return { ...state, selectedLanguage: action.language };
      case SELECT_CATEGORY:
        return { ...state, selectedCategory: action.category };
      case RESET_SEARCH:
        return{...state}
      default:
        return state;
    }
  };
  