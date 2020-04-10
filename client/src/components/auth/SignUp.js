import React, { Fragment, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class SignUp extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		type: ''
	};

	onChange = (e) => this.setState({ [e.target.name] : e.target.value });

	checkUser = (e) => {
		axios.get('http://localhost:3000/api/users/check?email=' + this.state.email)
		.then(res => {
			if(res.valid === true)
			   alert("User already exists");
		})
	}	

	onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, type } = this.state;

		axios.post('http://localhost:3000/api/users/signup', { name, email, password, type})
			 .catch(  (error) => {
				const response = error.response;
				alert(response.data.errors);
			 })
	};

	render() {
		return (			
			<Fragment>

				<h1 className="large text-primary">Sign Up</h1>
				<p className="lead">Create Your Account</p>
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
							type="email"
							placeholder="Email Address"
							name="email"
							value={this.state.email}
							onChange={this.onChange}
							onBlur={this.checkUser}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Password"
							name="password"
							minLength="8"
							value={this.state.password}
							onChange={this.onChange}
							required
						/>
					</div>

					<div className="form-group">
						<input
							type="radio"
							name="type"
							value="Admin"
							onChange={this.onChange}
						/>
						<span className="lead"> Admin </span>
						<input
							type="radio"
							name="type"
							value="Voter"
							onChange={this.onChange}
						/>
						<span className="lead"> Voter </span>
					</div>
					<input
						type="submit"
						className="btn btn-primary"
						value="Sign Up"
					/>
				</form>
				<p className="my-1">
					Already have an account? <Link to="/accounts/signin"> Sign In </Link>
				</p>
		</Fragment>
		)
	}
}

export default SignUp;

