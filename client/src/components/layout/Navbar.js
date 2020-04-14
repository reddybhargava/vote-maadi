import React, {Fragment} from 'react';
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const items =
    props.app.loggedIn === false ? (
      <Fragment>
        <li>
          <Link to="/accounts/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/accounts/signin">Sign In</Link>
        </li>
      </Fragment>
    ) : (
      <li>
        <Link to="/admin/elections">Host Election</Link>
      </li>
    );
  return (
    <nav className="navbar navbar-dark bg-transparent">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> Vote Maadi
        </Link>
      </h1>
      <ul>
        {items}
      </ul>
    </nav>
  );
};

export default Navbar;
