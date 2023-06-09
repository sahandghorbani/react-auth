import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import TheNavbar from "./TheNavbar";

function MainNavigation() {
  return (
    <div>
      <TheNavbar />

      <header className={classes.header}>
        <nav>
        </nav>
      </header>
    </div>
  );
}

export default MainNavigation;
