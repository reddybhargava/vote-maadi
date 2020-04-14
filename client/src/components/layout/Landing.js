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
						<Link to="/view/ongoing" className="btn btn-light"> Vote Now! </Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
