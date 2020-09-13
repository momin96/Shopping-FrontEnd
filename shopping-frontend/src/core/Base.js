import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My title ",
  description = "Description goes here",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu></Menu>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4"> {title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}> {children} </div>
      </div>
      <footer className="footer bg-success mt-auto py-3 ">
        <div className="container-fluid text-white text-center py-3">
          <h4 className="">If you have any question, Fell free to contant</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
      </footer>
      <div className="container">
        <span className="text-mutad">Shopping is fun</span>
      </div>
    </div>
  );
};

export default Base;
