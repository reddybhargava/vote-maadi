import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Vote Maadi</h1>
					<p className="lead">Cast your vote from wherever you are</p>
					<p className="lead">Every vote matters</p>
					<br />
					<div className="buttons">
						<Link to="/accounts/signup" className="btn btn-primary">
							Sign Up
						</Link>
						<Link to="/accounts/signin" className="btn btn-light">
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
