import React from "react";
import {Navbar,Button}from "react-bootstrap";
import { SearchForm } from "./SearchForm";
import { Logo } from "./Logo";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { toggleSettingsModal } from "../actions";

const Header = ({appName}) => {
  const dispatch = useDispatch();
  const showSettings = e => {
    dispatch(toggleSettingsModal(true));
  };
  return (
    <Navbar variant="dark" bg="dark" sticky="top">
      <Logo appName={appName}/>
      <Button
        variant="link"
        onClick={showSettings}
        className="p-0 mr-3 text-secondary"
      >
        <FontAwesomeIcon icon={faCog} />
      </Button>
     <SearchForm />
    </Navbar>
  );
};

export default Header;
