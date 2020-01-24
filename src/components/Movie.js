import React ,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import languages from "../constants/languages";
import { find,filter } from "lodash";
import { getImagesUrl, isNarrowScreen
} from "../utils";
import { Badge, Container, Row, Col,Card } from "react-bootstrap";
import PageNavigator from "./PageNavigator";
import RatingCircle from "./RatingCircle";
import ColorThief from "colorthief";
import Color from "color";
import { URL_YOUTUBE } from "../constants";


export const Movie = ({ movie }) => {
   document.title = movie.title;
   //getting configurations from store
   const config = useSelector(state => state.configurations);
 //get movie images
   const images = getImagesUrl(movie,config);


   return(
     <>
     <OverView movie={movie} images={images} id="overview"/>
     <Cast cast={movie.credits.cast.slice(0, 5)} id="cast" />
     <Extra movie={movie} id="extra"/>
     <PageNavigator
          offsetElementTop={0}
          offsetContainerTop={0}
          offsetContainerBottom={0}
          items={["Overview", "Cast", "Extra", "Reviews", "Recommendations"]}
        />
     </>
   )
  };
 
  
const Extra = ({movie,id}) => {
  const usReleaseDate = find(
    movie.release_dates.results,
    rel => rel.iso_3166_1 === "US"
  );
  const extra = {
    Status: movie.status,
    ReleaseDate: new Date(movie.release_date).toDateString().substr(4),
    Rating: usReleaseDate ? usReleaseDate.release_dates[0].certification : "-",
    ProductionCountries: movie.production_countries
      .map(pc => pc.name)
      .join(", "),

    Runtime: movie.runtime
      ? Math.floor(movie.runtime / 60) + "hr " + (movie.runtime % 60) + "mins"
      : "-",

    Budget: movie.budget ? "$" + movie.budget : "-",
    Revenue: movie.revenue ? "$" + movie.revenue : "-"
  };

  const trailers = filter(
    movie.videos.results,
    vid => vid.site === "YouTube"
  ).slice(0, 3);

  return (
    <div className="movie-extra py-3" id={id}>
      <Container>
        <Row>
          <Col>
            <h4>Extra</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Status</h6>
            <p>
              {extra.Status} <br></br>({extra.ReleaseDate})
            </p>
          </Col>
          <Col>
            <h6>Rating</h6>
            <p>{extra.Rating ? extra.Rating : "Not Rated"}</p>
          </Col>
          <Col>
            <h6>Production Countries</h6>
            <p>{extra.ProductionCountries}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>Runtime</h6>
            <p>{extra.Runtime}</p>
          </Col>
          <Col>
            <h6>Budget</h6>
            <p>{extra.Budget}</p>
          </Col>
          <Col>
            <h6>Revenue</h6>
            <p>{extra.Revenue}</p>
          </Col>
        </Row>
        {trailers.length > 0 && (
          <Row>
            <Col>
            <h6>Trailers</h6>
            </Col>
          </Row>
        )}
        {trailers.length > 0 && (
          <Row>
            {trailers.map(tr => (
              <Col key={tr.key} xs={12} lg={4}>
                <div className="movie-extra-trailer-card embed-responsive embed-responsive-16by9">
                  <YouTubeEmbed title={tr.name} video={tr.key} />
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
} ;
const YouTubeEmbed = ({ title, video, width = 320, height = 180 }) => (
  <iframe
    title={title}
    className="embed-responsive-item"
    src={URL_YOUTUBE + video}
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen="on"
  />
); 
const Cast = ({cast,id}) => {
  return(
    <div className="movie-cast py-3" id={id}>
      <Container>
        <Row>
          <Col>
          <h4>Top Billed Cast</h4>
          </Col>
        </Row>
        <Row>
          <Col>
          <div 
          className={"movie-cast-container" + (cast.length > 3 ? "justify-content-md-between" : "")
        }>
          {cast.map(char => (
            <Card key={char.cast_id}>
              <Card.Img
              variant="top"
              src={
                char.profile_path 
                ? "//images.tmdb.org/t/p/w185" + char.profile_path
                : "/imgs/profile-placeholder.jpg"
              }/>
              <Card.Body>
                <h6>{char.name}</h6>
                <div>
                  <i>as</i> {char.character}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}





















const OverView = ({movie,images,id}) => {
  const [prominentColor,setProminentColor] = useState(null);

  const original_language = find(
    languages,
    l => l.iso_639_1 === movie.original_language
   ).english_name;
   const relase_date = movie.relase_date ? movie.relase_date.split("-")[0] : "unknown";
let backdropSize = isNarrowScreen() ? "w780" : "w1280";
  
  useEffect(() => {
    if(!images.backdrop) return;

    const img = new Image();

    img.crossOrigin = "anonymous";
    const onLoad = e => {
      let color = Color.rgb(new ColorThief().getColor(e.target)).saturate(0.8);
      if (color.isLight()) color = color.darken(0.5);
      setProminentColor(color);
    };
    img.addEventListener("load",onLoad);
    img.src = images.backdrop.w300;
    return () => {
      img.removeEventListener("load",onLoad);
    };
  },[images]);

  const style = {};
  if(images.backdrop)
  style.backgroundImage = `url(${images.backdrop[backdropSize]})`;
  
  return(
    <div className="movie-overview" style={style} id={id}>
      <div
        className={images.backdrop ? "has-backdrop" : ""}
        style={{
          // If there is a backdrop and prominent color extracted, otherwise gray
          backgroundColor: prominentColor ? prominentColor.hex() : "#e3e3e3"
        }}
      >
        <Container as="main" id="movie-body-container">
          <Row className="align-items-center">
            <Col xs={4} md={5}>
              <div className="mt-2 mb-4 my-md-5">
                <div className="movie-poster my-2 mx-auto m-md-2">
                  <img src={images.poster.w500} alt="Movie Poster" />
                </div>
              </div>
            </Col>
            <Col xs={8} md={7}>
              <div className="my-2 my-md-5">
                <section className="mb-5">
                  <h3>{movie.title}</h3>
                  <span>
                    {release_date} | {original_language}
                  </span>
                  <div>
                    {movie.genres.map(genre => (
                      <React.Fragment key={genre.id}>
                        <Badge variant="dark">{genre.name}</Badge>{" "}
                      </React.Fragment>
                    ))}
                  </div>
                </section>
                {/* These will not be rendered on mobile devices */}
                {!isNarrowScreen() && (
                  <section className="mb-5">
                    <h4>Overview</h4>
                    <p>{movie.overview || "Not available"}</p>
                  </section>
                )}
                {!isNarrowScreen() && movie.tagline && (
                  <>
                    <section className="mb-4">
                      <h4>Tagline</h4>
                      <p>{movie.tagline || "Not available"}</p>
                    </section>
                    <section>
                      <h4>Score</h4>
                      <div className="my-2 d-flex align-items-center">
                        <RatingCircle
                          color="#d8454c"
                          width={60}
                          value={movie.vote_average * 10}
                        />
                        <div className="sr-only">
                          {movie.vote_average * 10}%
                        </div>
                        <div className="mx-3">{movie.vote_count} votes</div>
                      </div>
                    </section>
                  </>
                )}
              </div>
            </Col>
          </Row>
          {/* if mobile screen we will render different block to alter the view*/}
          {isNarrowScreen() && (
            <Row>
              <Col>
                <section>
                  <h4>Score</h4>
                  <div className="my-2 d-flex align-items-center">
                    <RatingCircle
                      color="#d8454c"
                      width={60}
                      value={movie.vote_average * 10}
                    />
                    <div className="sr-only">{movie.vote_average * 10}%</div>
                    <div className="mx-3">{movie.vote_count} votes</div>
                  </div>
                </section>
                <section className="mb-5">
                  <h4>Overview</h4>
                  <p>{movie.overview || "Not available"}</p>
                </section>
                {movie.tagline && (
                  <section className="mb-4">
                    <h4>Tagline</h4>
                    <p>{movie.tagline || "Not available"}</p>
                  </section>
                )}
                <section></section>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
};
