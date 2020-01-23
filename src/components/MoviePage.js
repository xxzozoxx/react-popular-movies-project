import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  URL_MOVIE,
  API_KEY_PARAM as API_KEY,
  MOVIE_APPEND_PARAMETER
} from "../constants";
import { Alert } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import { fetchJson } from "../utils";
import "./MoviePage.css";
import { Movie } from "./Movie";

const MoviePage = props => {
    const lang = useSelector(state => state.home.selectedLanguage.code)
    const [state,setState] = useState({
      movie:null,
      error:null,
      isLoading:true
    });
    const id = useParams().id;

    useEffect(() => {
      const abortController = new AbortController();
      const signal = abortController.signal;
      //resting the state when id or language is changed 
      setState({movie:null,error:null,isLoading:true});

  const page = document.getElementById("movie-page");
  page.focus();
  if(page.scrollIntoView) page.scrollIntoView();
  const url_movie = URL_MOVIE +"/" + id + API_KEY + MOVIE_APPEND_PARAMETER + lang;
  setState({movie:null, isLoading:true,error:null});
  fetchJson(url_movie,{signal:signal})
  .then(json => setState({error:null ,movie:json, isLoading:false}))
  .catch(err => setState({err:err.message,isLoading:false,movie:null})
  );
  return () => { abortController.abort(); };
},[id,lang]);
  
      return(
        <div id="movie-page" className="app-page">
        {state.isLoading && !state.error && <Loader />}
        {state.error && !state.isLoading && (
          <Alert variant="danger">
            <Alert.Heading>Oh Snap!</Alert.Heading>
            <p>{state.error}</p>
          </Alert>
        )}
        {!state.isLoading && !state.error && <Movie movie={state.movie} />}
      </div>
      );
  };

export default MoviePage;
const Loader = props => {
  return (
    <ContentLoader speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
      <rect x="0" y="0" width="100%" height="420px" />
    </ContentLoader>
  );
};