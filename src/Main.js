import React, { Component } from "react";
import "./Main.css";
import { fetchMoviesList } from "./actions";
import { connect } from "react-redux";


class Main extends Component {
  render() {
    const { dispatch } = this.props;

    return (
      <div className="App">
        <button onClick={e => dispatch(fetchMoviesList())}>Load</button>
      </div>
    );
  };
  }
const mapStateToProps = (state, ownProps) => ({});
export default connect(mapStateToProps)(Main);
