import React, {Fragment} from 'react';
import { Link } from "react-router-dom";
import '../../templates/css/main.css'

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
    <div className="landing">
    <header id="header" className="alt">
    <nav className="nav" style={{styles}}>
    <ul>
      {items}
    </ul>
    </nav>
    </header>
    </div>
  );
};

const styles = {
  paddingTop : '5px',
  fontColor : 'white'
}

export default Navbar;
