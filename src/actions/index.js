import {SELECT_CATEGORY,SELECT_LANGUAGE,
    FETCH_CONFIG,FETCH_CONFIG_FAILURE,FETCH_CONFIG_SUCCESS,
SEARCH_MOVIE,SEARCH_MOVIE_FAILURE,SEARCH_MOVIE_SUCCESS, RESET_SEARCH,
    FETCH_GENRES,FETCH_GENRES_FAILURE,FETCH_GENRES_SUCCESS,
    FETCH_MOVIES,FETCH_MOVIES_FAILURE,FETCH_MOVIES_SUCCESS,
    FETCH_MOVIE,FETCH_MOVIE_FAILURE,FETCH_MOVIE_SUCCESS,
    FETCH_REVIEWS,FETCH_REVIEWS_FAILURE,FETCH_REVIEWS_SUCCESS,
    TOGGLE_SETTINGS_MODAL
} from './types'
import {
    URL_CONFIG,
    URL_SEARCH,
    URL_GENRES,
    URL_MOVIES_POPULAR,
    URL_MOVIES_UPCOMING,
    URL_MOVIES_LATEST,
    URL_MOVIES_NOW_PLAYING,
    URL_MOVIES_TOP_RATED,
    URL_MOVIE,
    MOVIE_APPEND_PARAMETER,
    API_KEY_PARAM as API_KEY,
    API_KEY_ALT_PARAM as API_KEY_ALT,
    MOVIES_CATEGORIES
  } from "../constants";
  import {fetchJson} from "../utils"
  import { debounce } from "lodash";

  //CATEGORY ACTION
  export function toggleSettingsModal(toggle) {
    return {
      type: TOGGLE_SETTINGS_MODAL,
      toggle
    };
  }
  export function changeCategory(category){
      return dispatch => 
      dispatch({
          type:SELECT_CATEGORY,
          category
      });
  }
  //LANGUAGE ACTION
  export function changeLanguage(language){
      return dispatch => 
      dispatch({
          type:SELECT_LANGUAGE,
          language
      });
  }
  //CONFIG ACTION
  function fetchConfig(){
      return {
      type:FETCH_CONFIG
      };
  }
function fetchConfigSuccess(data){
    return {
        type:FETCH_CONFIG_SUCCESS,
        data
    };
}
function fetchConfigFailure(error){
    return{
        type:FETCH_CONFIG_FAILURE,
        error
    };
}
export function fetchConfigurations(){
    return dispatch => {
        dispatch(fetchConfig());
        return fetchJson(URL_CONFIG + API_KEY)
        .then(json => dispatch(fetchConfigSuccess(json)))
        .catch(error => dispatch(fetchConfigFailure(error.message)));
    };

}
//SEARCH MOVIE ACTION
function searchMovie(query) {
  return {
    type: SEARCH_MOVIE,
    query
  };
}

function searchMovieSuccess(data, query) {
  return {
    type: SEARCH_MOVIE_SUCCESS,
    data,
    query
  };
}

function searchMovieFailure(error) {
  return {
    type: SEARCH_MOVIE_FAILURE,
    error
  };
}

const debouncedSearch = debounce((dispatch, getState, query) => {
  const lang = getState().home.selectedLanguage.code;

  let url = URL_SEARCH + query + API_KEY_ALT + lang;
  if (query.length === 0) {
    return dispatch(resetSearchMovies());
  }
  dispatch(searchMovie(query));
  return fetchJson(url)
    .then(json => dispatch(searchMovieSuccess(json.results)))
    .catch(error => dispatch(searchMovieFailure(error.message)));
}, 350);

export function searchMovieList(query) {
  return (dispatch, getState) => {
    return debouncedSearch(dispatch, getState, query);
  };
}
export function resetSearchMovies() {
  return dispatch =>
    dispatch({
      type: RESET_SEARCH
    });
}
//FETCH GENRES ACTION
function fetchGenres(){
    return{
        type:FETCH_GENRES
    }
}

function fetchGenresSuccess(data){
    return{
        type:FETCH_GENRES_SUCCESS,
        data

    };
}
function fetchGenresFailure(error){
    return{
        type:FETCH_GENRES_FAILURE,
        error
    };
}
export function fetchGenresList() {
  return (dispatch, getState) => {
    const lang = getState().home.selectedLanguage.code;
    dispatch(fetchGenres());
    return fetchJson(URL_GENRES + API_KEY + lang)
      .then(json => dispatch(fetchGenresSuccess(json.genres)))
      .catch(error => dispatch(fetchGenresFailure(error.message)));
  };
}
//FETCH MOVIES ACTION
function fetchMovies() {
    return {
      type: FETCH_MOVIES
    };
  }
  
  function fetchMoviesSuccess(data) {
    return {
      type: FETCH_MOVIES_SUCCESS,
      data
    };
  }
  
  function fetchMoviesFailure(error) {
    return {
      type: FETCH_MOVIES_FAILURE,
      error
    };
  }
  
  export function fetchMoviesList() {
    return (dispatch,getState) => {
      dispatch(fetchMovies());
      const state = getState();
      const category = state.home.selectedCategory.code;
      const lang = state.home.selectedLanguage.code;
      let url;
      switch(category){
        case MOVIES_CATEGORIES.LATEST.code:
          url= URL_MOVIES_LATEST;
          break;
        case MOVIES_CATEGORIES.UPCOMING.code:
            url= URL_MOVIES_UPCOMING;
            break;
        case MOVIES_CATEGORIES.NOW_PLAYING.code:
          url = URL_MOVIES_NOW_PLAYING;
          break;
        case MOVIES_CATEGORIES.TOP_RATED.code:
          url = URL_MOVIES_TOP_RATED;
          break;
        case MOVIES_CATEGORIES.POPULAR.code:
          default:
            url = URL_MOVIES_POPULAR;   
      }
      return fetchJson(url + API_KEY + lang)
      .then(json => dispatch(fetchMoviesSuccess(json.results)))
      .catch(error => dispatch(fetchMoviesFailure(error.message)))
    };
  }
  
//FETCH SINGLE MOVIE DETAILS
function fetchMovie() {
    return {
      type: FETCH_MOVIE
    };
  }
  
  function fetchMovieSuccess(data) {
    return {
      type: FETCH_MOVIE_SUCCESS,
      data
    };
  }
  
  function fetchMovieFailure(error) {
    return {
      type: FETCH_MOVIE_FAILURE,
      error
    };
  }
  
  export function fetchMovieDetail(id) {
    const url_movie = URL_MOVIE + id + API_KEY + MOVIE_APPEND_PARAMETER;
    return dispatch => {
      dispatch(fetchMovie());
      return fetchJson(url_movie)
        .then(data => dispatch(fetchMovieSuccess(data)))
        .catch(error => dispatch(fetchMovieFailure(error.message)));
    };
  }
  //FETCH REVIEW ACTION
  function fetchReviews() {
    return {
      type: FETCH_REVIEWS
    };
  }
  
  function fetchReviewsSuccess(data) {
    return {
      type: FETCH_REVIEWS_SUCCESS,
      data
    };
  }
  
  function fetchReviewsFailure(error) {
    return {
      type: FETCH_REVIEWS_FAILURE,
      error
    };
  }
  
  export function fetchReviewsList(id) {
    return function(dispatch) {
      dispatch(fetchReviews());
      return fetchJson(URL_GENRES + API_KEY)
        .then(data => {
          dispatch(fetchReviewsSuccess(data.results));
        })
        .catch(error => dispatch(fetchReviewsFailure(error.message)));
    };
  }
  
  
