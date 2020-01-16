import { MOVIES_CATEGORIES, MOVIE_LANG_PARAMETER_US,MOVIE_LANG_PARAMETER_AR } from "../constants";
import {
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
    SEARCH_MOVIE,
    SELECT_CATEGORY,
    SELECT_LANGUAGE,
    RESET_SEARCH,
    SEARCH_MOVIE_SUCCESS,
    SEARCH_MOVIE_FAILURE,
    FETCH_CONFIG_SUCCESS,
   FETCH_GENRES_SUCCESS
} from '../actions/types'


const initState = {
  movies: [],
  searchResults: [],
  searchError: null,
  error: null,
  searchQuery: "",
  selectedCategory: MOVIES_CATEGORIES.POPULAR,
  selectedLanguage: MOVIE_LANG_PARAMETER_AR,
  configsLoaded: false,
  genresLoaded: false
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
    case SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        searchResults: action.data,
        searchError: null
      };
    case SEARCH_MOVIE_FAILURE:
      return { ...state, searchError: action.error };
      case FETCH_CONFIG_SUCCESS:
      return { ...state, configsLoaded: true };
    case FETCH_GENRES_SUCCESS:
      return { ...state, genresLoaded: true };
    default:
      return state;
  }
};
  