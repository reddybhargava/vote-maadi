import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class SignIn extends Component {
	state = {
		email: '',
		password: ''
	};

	checkUser = (e) => {
		console.log('http://localhost:3000/api/users/check?email=' + this.state.email);
		axios.get('http://localhost:3000/api/users/check?email=' + this.state.email)
		.then(res => {
			if(res.valid === true)
			   alert("Sign Up First");
		})
	}

	onChangeEmail = (e) => {
		this.setState({email: e.target.value});
	};
	onChangePwd = (e) => this.setState({password: e.target.value});

	onSubmit = (e) => {
			e.preventDefault();
			const { email, password } = this.state;

			axios.post('http://localhost:3000/api/users/signin', { email, password })
			.catch(  (error) => {
				const response = error.response;
				alert(response.data.errors);
			  })

		};

	render() {
		return (
			<Fragment>
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">Sign Into Your Account</p>
			<form className="form" onSubmit={this.onSubmit}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={this.state.email}
						onChange={this.onChangeEmail}
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
						onChange={this.onChangePwd}
						required
					/>
				</div>
				<input
					type="submit"
					className="btn btn-primary"
					value="Sign In"
				/>
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/accounts/signup"> Sign Up </Link>
			</p>
		</Fragment>
		)
	}
}

export default SignIn
