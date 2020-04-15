import React, { Fragment, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../../form_templates/css/main.css"

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  checkUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/api/users/check?email=" + this.state.email);
      if (res.data.valid === false) alert("Sign Up First");
    } catch (error) {
      alert(error.response.data.errors);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const res = await axios.post("/api/users/signin", {
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

  render() {
    if (this.props.app.loggedIn === true) {
      return <Redirect to="/" />;
    }

    return (
      <Fragment>
        <div className="container-contact100" style={styles}>
          <div className="wrap-contact100" style={styles2}>
              <span className="contact100-form-title" style={{paddingTop : 10}}>Sign In</span>
              <div className="wrap-input100 validate-input">
                <label className="label-input100">
                  Email Address
                </label>
                <input
                  id="email"
                  className="input100"
                  type="email"
                  placeholder="Enter your email..."
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  onBlur={this.checkUser}
                  required
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input">
                <label className="label-input100">
                  Password
                </label>
                <input
                  id="name"
                  type="password"
                  placeholder="Enter your password..."
                  className="input100"
                  name="password"
                  minLength="8"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
                <span className="focus-input100"></span>
              </div>

              <div className="container-contact100-form-btn">
                <button className="contact100-form-btn" onClick={this.onSubmit}>
                  Submit
                </button>
              </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const styles = {
  backgroundColor : '#f4f4f4',
  paddingLeft : 400,
  paddingRight : 400,
  width : '100%'
}

const styles2 = {
  backgroundColor : 'white',
  paddingLeft : 20,
  paddingRight : 20,
  paddingBottom : 20,
  paddingTop : 30,
  width : '100%'
}

export default SignIn;
