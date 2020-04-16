import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../templates/css/main.css'
import Navbar from './Navbar'


export class Landing extends Component {
    render() {
        return (
			<div className="landing">

				{/* <Navbar app={this.props.app} /> */}


				<section id="banner">
					<h2>Vote Maadi</h2>
					<p> Cast your Vote. <br /> Every vote matters</p>
					<ul className="actions">
						<Link to="/view/ongoing" className="btn btn-light">		
						<li><div href="#" className="button special big"> Vote Now!</div> </li>
						</Link>
					</ul>
				</section>		
					<div className="highlights">
						<section>
							<div className="content">
								<header>
									<a className="icon fa-laptop"><span className="label">Icon</span></a>
									<h3>Online Voting</h3>
								</header>
								<p>Avoid the hassle of waiting in queues to cast your vote. Exercise your right using our website. We provide a secure platform, with intuitive UI design.</p>
							</div>
						</section>
						
						<section>
							<div className="content">
								<header>
									<a className="icon fa-files-o"><span className="label">Icon</span></a>
									<h3>Paper Friendly</h3>
								</header>
								<p>Do away with paper for voting, pamplets, voter documents. Lets go green and do our bit to save the planet.</p>
							</div>
						</section>
	
						<section>
							<div className="content">
								<header>
									<a className="icon fa-line-chart"><span className="label">Icon</span></a>
									<h3>Data Analytics</h3>
								</header>
								<p>Analyze the election results from informative, intuitive graphs. We evaluate every candidate using sentiment analysis on their election manifesto.</p>
							</div>
						</section>
						
					</div>
	
					<footer id="footer" text-align="center">
						<div className="inner">
							<div className="content" display="inline-block">
								<section>
									<h2>Additional Info</h2>
									<p>This website has been developed as a part of the Web Tech 2 course.</p>
									<h4> Authors</h4> 
									<ul>
										<li>Aishwarya Kumaraswamy (aishwaryakalgudi@gmail.com)</li>
										<li> Bhargava N Reddy </li>
									</ul>

								</section>
							</div>
						</div>
					</footer>
		</div>
        )
    }
}

export default Landing

