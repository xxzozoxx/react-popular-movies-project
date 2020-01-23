import React from "react";
import { useSelector } from "react-redux";
import languages from "../constants/languages";
import { find } from "lodash";
import { getImagesUrl } from "../utils";
import { Badge, Container, Row, Col } from "react-bootstrap";
import PageNavigator from "./PageNavigator";
import RatingCircle from "./RatingCircle";

export const Movie = ({ movie }) => {
   document.title = movie.title;
   const config = useSelector(state => state.configurations);
   const images = getImagesUrl(movie,config);
   const original_language = find(languages,{
    iso_639_1: movie.original_language
   }).english_name;
   const relase_date = movie.relase_date ? movie.relase_date.split("-")[0] : "unknown";

   return(
     <>
     <MovieCover
        backdrop_url={images.backdrop ? images.backdrop.original : null}
        title={movie.title}
        release_date={movie.release_date}
        original_language={movie.original_language}
        genres={movie.genres}
      />
     <div>
        <MovieBody movie={movie} images={images} />
        <PageNavigator
          offsetElementTop={0}
          offsetContainerTop={0}
          offsetContainerBottom={0}
          items={["Overview", "Cast", "Details", "Reviews", "Recommendations"]}
        />
      </div>
     </>
   )
  };
export const MovieCover = ({
  backdrop_url,
  title,
  release_date,
  original_language,
  genres
}) => (
  <div
    className="movie-cover"
    style={{
      backgroundImage: backdrop_url ? `url(${backdrop_url})` : "",
      backgroundColor: !backdrop_url ? "#fff" : ""
    }}
    >
    <div className="movie-cover-overlay">
      <div className="container movie-cover-meta">
        <div className="m-3">
          <h3>{title}</h3>
          <span>
            {release_date} | {original_language}
          </span>
          <div>
            {genres.map(genre => (
              <React.Fragment key={genre.id}>
                <Badge variant="dark">{genre.name}</Badge>{" "}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
export const MoviePoster = ({ poster }) => (
  <div className="movie-poster my-2 mx-auto m-md-2">
    <img src={poster} alt="Movie Poster" />
  </div>
);
export const MovieBody = ({ movie, images }) => (
  <Container as="main" id="movie-body-container">
    <Row>
      <Col>
        <div id="overview" className="py-2">
          <Row>
            <Col xs={12} md={5}>
              <MoviePoster poster={images.poster.w500}></MoviePoster>
            </Col>
            <Col>
              <div className="movie-body-overview my-2 my-md-5">
                <h4>Score</h4>
                <div className="my-2 d-flex align-items-center justify-content-center justify-content-md-start">
                  <RatingCircle
                    color="#d8454c"
                    width={60}
                    value={movie.vote_average * 10}
                  />

                  <div className="mx-3">{movie.vote_count} votes</div>
                </div>
                <h4>Tagline</h4>
                <p>{movie.tagline}</p>
                <h4>Overview</h4>
                <p>{movie.overview}</p>
              </div>
            </Col>
          </Row>
        </div>
        <div id="cast"></div>
        <div id="details"></div>
        <div id="reviews"></div>
      </Col>
    </Row>
  </Container>
);