import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__tag">
        <h1>Sharpener/Mail</h1>
      </div>
      <div className="header__searchBar">
        <input className="header__searchBar__input" />
        <SearchIcon className="header__searchBar__Icon" />
      </div>
    </div>
  );
};

export default Header;
