import React, { Fragment, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

	checkUser = () => {
		console.log('http://localhost:3000/api/users/check?email=' + this.state.email);
		axios.get('http://localhost:3000/api/users/check?email=' + this.state.email)
		.then(res => {
			if(res.valid === true)
			   alert("Sign Up First");
		})
	}

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const res = await axios.post("http://localhost:3000/api/users/signin", {
        email,
        password,
      });
      console.log(res);
      this.props.logIn();
      this.props.setName(email);
      this.props.setToken(res.data.token);
      
    } catch (error) {
      alert(error.response.data.errors);
    }
  };

  check = () => {
    console.log(this.props);
    this.props.logIn();
  }

  render() {
    if (this.props.app.loggedIn === true) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">Sign Into Your Account</p>
        <form className="form">
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

          <div>
            <button className="btn btn-primary" onClick={this.onSubmit}> Sign In</button>
          </div>

        </form>       

        <p className="my-1">
          Don't have an account? <Link to="/accounts/signup"> Sign Up </Link>
        </p>
      </Fragment>
    );
  }
}

export default SignIn;
