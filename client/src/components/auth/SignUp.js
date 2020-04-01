import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		type: ''
	});

	const { name, email, password, password2, type } = formData;

	const onChange = e =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});

	const onSubmit = e => {
		e.preventDefault();
		if (password !== password2) {
			console.log('Passwords do not match');
		} else if (!type) {
			console.log('Admin or Voter has to be selected');
		} else {
			console.log(formData);
		}
	};

	return (
		<Fragment>
			{/* <section className="container"> */}
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">Create Your Account</p>
			<form className="form" onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="8"
						value={password}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="8"
						value={password2}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="radio"
						name="type"
						value="Admin"
						onChange={e => onChange(e)}
					/>
					<span className="lead"> Admin </span>
					<input
						type="radio"
						name="type"
						value="Voter"
						onChange={e => onChange(e)}
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
				Already have an account? <Link to="/signin"> Sign In </Link>
			</p>
			{/* </section> */}
		</Fragment>
	);
};

export default SignUp;
