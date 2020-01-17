
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchMovieList } from "../actions";
import Autosuggest from "react-autosuggest";
import "./SearchForm.css"

export const SearchForm = () => {
  //useSelector : allows to extract data from redux store state
  const storeSearchQuery = useSelector(state => state.home.searchQuery); //we get the search query
  const movies = useSelector(state => state.home.searchResults); //we got the list of movies based on searched query
  const dispatch = useDispatch();
  //initial state of searchQuery is the one stored in storeSearchQuery which is linked to the redux store.
  const [searchQuery,setSearchQuery] = useState(storeSearchQuery);

  const handleChange = query => {
    //onChange we will update searchQuery
    setSearchQuery(query);
    dispatch(searchMovieList(query));
  };
  const renderSuggestion = movie => <MovieItem movie={movie}/>
  const inputPrpos = {
    type:"text",
    placeholder:"Search Movies",
    "aria-label": "Type your query to search movies",
    id: "search-bar",
    value:searchQuery,
    autoComplete:"off",
    onChange:(e,other) => 
    other.method === "type" && handleChange(e.target.value.trim())
  };
return (
  <Form className="ml-auto mr-sm-4" id="search-form">
    <Autosuggest
    suggestions={movies}
    onSuggestionsFetchRequested={() => {}}
    onSuggestionsClearRequested={() => {}}
    getSuggestionValue={movie => movie.title}
    renderSuggestion={renderSuggestion}
    inputProps={inputPrpos}
    onSuggestionSelected={(event,{suggestion}) => {
      console.log(suggestion.title);
    }}
    renderInputComponent={inputPrpos => (
      <div className="has-search">
        <span className="form-control-feedback">
          <FontAwesomeIcon icon={faSearch}/>
        </span>
        <FormControl {...inputPrpos}/>
      </div>
    )}
    />
  </Form>
);
};
const MovieItem = ({movie}) => {
  const config = useSelector(state => state.configurations.images);
  const poster = movie.poster_path ?  `${config.base_url.split(":")[1].concat(config.poster_sizes[0])}/${
    movie.poster_path
  }`
  :null;
  return(
    <Row className = "p-1 align-items-center">
      <Col xs={1}>
        {poster && (
          <img
          src={poster}
          alt={movie.title + "backdrop"}
          style={{height:50}}
          />
          )}
      </Col>
      <Col>
      <h6 className = "d-inline">{movie.title}</h6>
      <i>
          ({movie.release_date ? movie.release_date.split("-")[0] : "Unknown"})
        </i>
      </Col>
    </Row>
  );
};
