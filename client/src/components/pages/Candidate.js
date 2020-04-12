import React, { Fragment, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class SignUp extends Component {
	state = {
        object :  {
            name: '',
            promises: '',
            gender: '',
            age: ''
        },
        candidates: [ ]
	};

	onChange = (e) => this.setState({ [e.target.name] : e.target.value });

	onSubmit = (e) => {
		e.preventDefault();
		const { name, description, startTime, endTime, hostedBy } = this.state;

		axios.post('http://localhost:3000/api/elections/:electionId/candidates', { name, description, startTime, endTime, hostedBy })
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				alert(error.response.data.errors);
			})
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
							type="time"
							placeholder="Start Time"
							name="startTime"
							value={this.state.startTime}
							onChange={this.onChange}
							required
						/>
					</div>

					<div className="form-group">
						<input
							type="time"
							placeholder="End Time"
							name="endTime"
							value={this.state.endTime}
							onChange={this.onChange}
							required
						/>
					</div>

					<input
						type="submit"
						className="btn btn-primary"
						value="Next"
					/>
				</form>
		</Fragment>
		)
	}
}

export default SignUp;

