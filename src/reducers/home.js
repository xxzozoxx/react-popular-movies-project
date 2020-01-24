import { MOVIES_CATEGORIES,LANGUAGES } from "../constants";
import {
    FETCH_MOVIES,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE,
    SEARCH_MOVIE,
    SELECT_CATEGORY,
    SELECT_LANGUAGE,
    RESET_SEARCH,
    SEARCH_MOVIE_SUCCESS,
    SEARCH_MOVIE_FAILURE,
    FETCH_CONFIG_SUCCESS,
   FETCH_GENRES_SUCCESS,
   TOGGLE_SETTINGS_MODAL
} from '../actions/types'

const settings = JSON.parse(window.localStorage.getItem("settings")) || {};
const initState = {
  movies: [],
  searchResults: [],
  searchError: null,
  error: null,
  searchQuery: "",
  selectedCategory:settings.selectedCategory || MOVIES_CATEGORIES.POPULAR,
  selectedLanguage: settings.selectedLanguage || LANGUAGES.ENGLISH,
  configsLoaded: false,
  genresLoaded: false,
  showSettings:false,
  isLoadingMovies:false,
  isSearching:false
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {...state,isLoadingMovies:true};
    case FETCH_MOVIES_SUCCESS:
      return { ...state, movies: action.data ,isLoadingMovies:false};
    case FETCH_MOVIES_FAILURE:
      return { ...state, error: action.error,isLoadingMovies:false };
    case SEARCH_MOVIE:
      return {
        ...state,
        searchQuery: action.query,
        searchResults: [],
        isSearching:true,
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
        isSearching:false,
        searchError: null
      };
    case SEARCH_MOVIE_FAILURE:
      return { 
        ...state, 
        isSearching:false,
        searchError: action.error
       };
      case FETCH_CONFIG_SUCCESS:
        return { ...state, configsLoaded: true };
      case FETCH_GENRES_SUCCESS:
        return { ...state, genresLoaded: true };
    case TOGGLE_SETTINGS_MODAL:
      return {...state,showSettings:action.toggle};
    default:
      return state;
  }
};
  