import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-transparent">
			<h1>
				<Link to="/">
					<i className="fas fa-code"></i> Vote Maadi
				</Link>
			</h1>
			<ul>
				<li>
					<Link to="/admin/elections">Host Election</Link>
				</li>
				<li>
					<Link to="/accounts/signup">Sign Up</Link>
				</li>
				<li>
					<Link to="/accounts/signin">Sign In</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
