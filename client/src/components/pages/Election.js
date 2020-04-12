import React, { Fragment, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Election extends Component {
	state = {
		name: '',
		description: '',
		startTime: '',
		endTime: '',
	};

	onChange = (e) => this.setState({ [e.target.name] : e.target.value });

	onSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': this.props.app.token
			}
		}
		const { name, description, startTime, endTime } = this.state;
		const body = JSON.stringify({name, description, startTime, endTime});
		console.log(body);
		console.log(this.props.app.token);

		try {
			const res = await axios.post("http://localhost:3000/api/elections", 
			body,
			config
			);
			console.log(res);			
		  } catch(error){
			const response = error.response
			console.log(response.data)
		  }
	};

	render() {
		return (			
			<Fragment>
				<h1 className="large text-primary">Election Details</h1>
				<p className="lead">Host your own Election</p>
				<form className="form" onSubmit={this.onSubmit}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Name"
							name="name"
							value={this.state.name}
							onChange={this.onChange}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="description"
							placeholder="Description"
							name="description"
							value={this.state.description}
							onChange={this.onChange}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="datetime-local"
							placeholder="Start Time"
							name="startTime"
							value={this.state.startTime}
							onChange={this.onChange}
							required
						/>
					</div>

					<div className="form-group">
						<input
							type="datetime-local"
							placeholder="End Time"
							name="endTime"
							value={this.state.endTime}
							onChange={this.onChange}
							required
						/>
					</div>

					{/* <div className="form-group">
						<input 
							type="file" 
							className="img" 
							onChange={this.onChange}
						/>
					</div> */}

					<div>
						<button className="btn btn-primary" onClick={this.onSubmit}> Next</button>
					</div>
				</form>
		</Fragment>
		)
	}
}

export default Election;

