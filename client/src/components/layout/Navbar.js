import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fas fa-code"></i> Vote Maadi
				</Link>
			</h1>
			<ul>
				<li>
					<Link to="/developers">Developers</Link>
				</li>
				<li>
					<Link to="/signup">Sign Up</Link>
				</li>
				<li>
					<Link to="/signin">Sign In</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
