import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class SignIn extends Component {
	state = {
		email: '',
		password: ''
	};

	// componentDidMount() {
	// 	axios.get(`https://jsonplaceholder.typicode.com/users`)
	// 	  .then(res => {
	// 		const persons = res.data;
	// 		this.setState({ persons });
	// 	  })
	//   }

	checkUser = (e) => {
		//console.log(this.email);
		axios.get('http://localhost:3000/api/users/check?email=' + this.email)
		.then(res => {
			if(!res.valid)
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

			axios.post('/signin', { email, password });
			console.log(email, password);
	};

	render() {
		return (
			<Fragment>
			{/* <section className="container"> */}
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
				Don't have an account? <Link to="/signup"> Sign Up </Link>
			</p>
			{/* </section> */}
		</Fragment>
		)
	}
}

export default SignIn
