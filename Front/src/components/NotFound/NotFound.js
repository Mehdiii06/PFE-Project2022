import React from "react";
import './NotFound.scss'

const NotFound = () => {
  return (
    <>
      <div className="sectionNotFound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>Oops!</h1>
            <h2>404 - The Page can't be found</h2>
          </div>
          <a href="/">Go TO Homepage</a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
