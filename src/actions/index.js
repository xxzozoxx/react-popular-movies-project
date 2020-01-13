import {SELECT_CATEGORY,SELECT_LANGUAGE,
    FETCH_CONFIG,FETCH_CONFIG_FAILURE,FETCH_CONFIG_SUCCESS,
    SEARCH_MOVIE,SEARCH_MOVIE_FAILURE,SEARCH_MOVIE_SUCCESS,
    FETCH_GENRES,FETCH_GENRES_FAILURE,FETCH_GENRES_SUCCESS,
    FETCH_MOVIES,FETCH_MOVIES_FAILURE,FETCH_MOVIES_SUCCESS,
    FETCH_MOVIE,FETCH_MOVIE_FAILURE,FETCH_MOVIE_SUCCESS,
    FETCH_REVIEWS,FETCH_REVIEWS_FAILURE,FETCH_REVIEWS_SUCCESS
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
    MOVIES_CATEGORIES,
    MOVIE_LANG_PARAMETER_AR,
    MOVIE_LANG_PARAMETER_US
  } from "../constants";
  //CATEGORY ACTION
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
        dispatch(fetchConfig);
        return fetch(URL_CONFIG + API_KEY)
        .then(response => response.json())
        .then(json => json.results)
        .then(data => dispatch(fetchConfigSuccess(data)))
        .catch(error => dispatch(fetchConfigFailure(error)));
    };

}
//SEARCH MOVIE ACTION
function searchMovie(query){
    return {
        type:SEARCH_MOVIE,
        query
    }
}
function searchMovieSuccess(data,query){
    return{
        type:SEARCH_MOVIE_SUCCESS,
        data,
        query

    }
}
function searchMovieFailure (error){
    return {
         type:SEARCH_MOVIE_FAILURE,
         error
    }
    
}
export function searchMovieList(query){
    let url = URL_SEARCH + query +API_KEY_ALT;
    return dispatch =>{
        dispatch(searchMovie(query));
        return fetch(url)
        .then(response => response.json())
        .then(json => json.results)
        .then (movieList => dispatch(searchMovieSuccess(movieList,query)))
        .catch(error => dispatch(searchMovieFailure(error)))
    }
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
export function fetchGenresList(){
    return dispatch => {
        dispatch(fetchGenres)
        return fetch(URL_GENRES + API_KEY)
        .then(response => response.json())
      .then(json => json.results)
      .then(data => dispatch(fetchGenresSuccess(data)))
      .catch(error => dispatch(fetchGenresFailure(error)));
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
  
  function fetchMoviesFail(error) {
    return {
      type: FETCH_MOVIES_FAILURE,
      error
    };
  }
  
  export function fetchMoviesList() {
    return (dispatch, getState) => {
      dispatch(fetchMovies());
  
      const category = MOVIES_CATEGORIES.POPULAR; 
      let url;
  
      switch (category) {
        case MOVIES_CATEGORIES.LATEST:
          url = URL_MOVIES_LATEST;
          break;
        case MOVIES_CATEGORIES.UPCOMING:
          url = URL_MOVIES_UPCOMING;
          break;
        case MOVIES_CATEGORIES.NOW_PLAYING:
          url = URL_MOVIES_NOW_PLAYING;
          break;
        case MOVIES_CATEGORIES.TOP_RATED:
          url = URL_MOVIES_TOP_RATED;
          break;
        case MOVIES_CATEGORIES.POPULAR:
        default:
          url = URL_MOVIES_POPULAR;
      }
  
      return fetch(url + API_KEY)
        .then(response => response.json())
        .then(json => json.results)
        .then(data => dispatch(fetchMoviesSuccess(data)))
        .catch(error => dispatch(fetchMoviesFail(error)));
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
  
  function fetchMovieFail(error) {
    return {
      type: FETCH_MOVIE_FAILURE,
      error
    };
  }
  
  export function fetchMovieDetail(id) {
    const url_movie = URL_MOVIE + id + API_KEY + MOVIE_APPEND_PARAMETER;
    return dispatch => {
      dispatch(fetchMovie());
      return fetch(url_movie)
        .then(response => response.json())
        .then(data => dispatch(fetchMovieSuccess(data)))
        .catch(error => dispatch(fetchMovieFail(error)));
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
  
  function fetchReviewsFail(error) {
    return {
      type: FETCH_REVIEWS_FAILURE,
      error
    };
  }
  
  export function fetchReviewsList(id) {
    return function(dispatch) {
      dispatch(fetchReviews());
      return fetch(URL_GENRES + API_KEY)
        .then(response => response.json())
        .then(json => json.results)
        .then(data => {
          dispatch(fetchReviewsSuccess(data));
        })
        .catch(error => dispatch(fetchReviewsFail(error)));
    };
  }
  
  