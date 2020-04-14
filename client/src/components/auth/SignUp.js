import React, { Fragment, useState, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    type: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  checkUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/api/users/check?email=" + this.state.email);
      if (res.data.valid === true) alert("Account Already Exists!");
    } catch (error) {
      alert(error.response.data.errors);
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, type } = this.state;

    try {
      const res = await axios.post("/api/users/signup", {
        name,
        email,
        password,
        type,
      });
      this.props.logIn();
      this.props.setName(email);
      this.props.setToken(res.response.data.token);
    } catch (error) {
      alert(error.response.data.errors);
    }
  };

  render() {
    if (this.props.app.loggedIn === true) {
      return <Redirect to="/" />;
    }
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
          <div>
            <button className="btn btn-primary" onClick={this.onSubmit}>
              Sign Up
            </button>
          </div>
        </form>
        <p className="my-1">
          Already have an account? <Link to="/accounts/signin"> Sign In </Link>
        </p>
      </Fragment>
    );
  }
}

export default SignUp;
