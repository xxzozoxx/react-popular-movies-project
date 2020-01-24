import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchMoviesList} from "../actions"
import {Loader} from "./MoviePage"; 
import {Card} from "react-bootstrap";
import "./HomePage.css";
import {Link} from "react-router-dom";

const HomePage = props => {
  document.title = "Popular Movies - Your all-in-one movies home!";
  const dispatch = useDispatch();
  const movies = useSelector(state => state.home.movies);
  const isLoading = useSelector(state => state.home.isLoadingMovies);
useEffect(() => {dispatch(fetchMoviesList())
},[]);
  return(
    <div>
    {isLoading && <Loader/>}
    {!isLoading && <MovieList movies={movies}/>}
    </div>
  )
};
export default HomePage;
const MovieList = ({movies}) => {
  return(
  <div className="main-container">
    <div className="movie-poster-container">
    {movies.map( movie =>(
    <Card key={movie.id}>
      <Link to={`movie/${movie.id}`}>
      <Card.Img src={"//image.tmdb.org/t/p/w500"+ movie.poster_path}
       variant="top" />
       </Link>
      <Card.Body>
      <h5>{movie.title}</h5>
      <h6>{movie.release_date}</h6>
      </Card.Body>
    </Card>
    )
    )}
    </div>
  </div>
)  
};