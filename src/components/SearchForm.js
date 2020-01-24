import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, Form, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { searchMovieList } from "../actions";
import Autosuggest from "react-autosuggest";
import "./SearchForm.css";
import { getImagesUrl } from "../utils";
import { history } from "../store";


export const SearchForm = () => {
  //useSelector : allows to extract data from redux store state
  const storeSearchQuery = useSelector(state => state.home.searchQuery); //we get the search query
  const movies = useSelector(state => state.home.searchResults); //we got the list of movies based on searched query
  const storeIsSearching = useSelector(state => state.home.isSearching);
  const dispatch = useDispatch();
  //initial state of searchQuery is the one stored in storeSearchQuery which is linked to the redux store.
  const [searchQuery,setSearchQuery] = useState(storeSearchQuery);

  const handleChange = query => {
    //onChange we will update searchQuery
    setSearchQuery(query);
    dispatch(searchMovieList(query.trim()));
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
    other.method === "type" && handleChange(e.target.value)
  };
return (
  <Form className="ml-auto mr-sm-4" id="search-form" 
  onSubmit={e => {e.preventDefault();}}
  >
    <Autosuggest
    suggestions={movies}
    onSuggestionsFetchRequested={() => {}}
    onSuggestionsClearRequested={() => {}}
    getSuggestionValue={movie => movie.title}
    renderSuggestion={renderSuggestion}
    inputProps={inputPrpos}
    onSuggestionSelected={(event,{suggestion}) =>{
      history.push("/movie/" + suggestion.id, { movie: suggestion });
    }}
    renderInputComponent={inputPrpos => (
      <div className="has-search">
        <span className="form-control-feedback">
          {!storeIsSearching && <FontAwesomeIcon icon={faSearch}/>}
          {storeIsSearching && (
            <Spinner animation="border" variant="secondary" size="sm" role="Search Status">
              <span className="sr-only">Searching...</span>
            </Spinner>
          )}
        </span>
        <FormControl {...inputPrpos}/>
      </div>
    )}
    />
  </Form>
);
};
const MovieItem = ({ movie }) => {
  const config = useSelector(state => state.configurations);
  const { poster } = getImagesUrl(movie, config);
  return (
    <Row className="p-1 align-items-center movie-suggestion-item">
      <Col sm={2}>
        {poster && (
          <img
            src={Object.values(poster)[0]}
            alt={movie.title + " backdrop"}
            style={{ height: 65, border: "1px solid #a4a4a4" }}
          />
        )}
      </Col>
      <Col xs={12} sm={10} className="p-2">
        <h6 className="my-0 mx-1">{movie.title}</h6>
        <p className="mx-1">
          ({movie.release_date ? movie.release_date.split("-")[0] : "Unknown"})
        </p>
      </Col>
    </Row>
  );
};