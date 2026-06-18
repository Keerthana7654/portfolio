import React from "react";
import "./CSS/Nav.css";

const Nav = ({
  scrollToHome,
  scrollToAbout,
  scrollToProjects,
  scrollToContact,
}) => {
  return (
    <div>
      <nav>
        <div className="navDiv" id="subNavDiv1">
          <li>KEERTHANA'S</li>
          <li style={{ color: "red" }}> - </li>
          <li style={{ color: "red" }}> PAGE</li>
        </div>

        <div className="navDiv" id="subNavDiv2">
          <li onClick={scrollToHome}>
            Home
          </li>
          <li onClick={scrollToAbout}>
            Skills
          </li>
          <li onClick={scrollToProjects}>
            Projects
          </li>
          <li onClick={scrollToContact}>
            Contact
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
