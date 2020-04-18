import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class ViewResults extends Component {
	render() {
		return (
			<div className="product" style={{ backgroundColor: '#f4f4f4' }}>
				<Link
					to={{
						pathname: '/elections/results',
						state: {
							electionId: this.props.item._id,
							electionName: this.props.item.name
						}
					}}
				>
					<Fragment>
						<img
							src={this.props.item.imageURL}
							alt="Candidate"
							style={img_styles}
						/>
						<h2 className="header">{this.props.item.name}</h2>
						<br />
						<p className="description">
							{' '}
							{this.props.item.description}{' '}
						</p>
						<br />
						<button className="button" style={btn_style}>
							See Result
						</button>
					</Fragment>
				</Link>
			</div>
		);
	}
}

const img_styles = {
	objectFit: 'cover',
	maxWidth: '250px',
	maxHeight: '450px'
};

const btn_style = {
	marginTop: '80px'
};

export default ViewResults;
