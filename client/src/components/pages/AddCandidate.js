import React, { Fragment, useState, Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export class AddCandidate extends Component {
  state = {
    name: "",
    promises: "",
    gender: "",
    age: "",
    selectedFile: null,
    csv: null,
    redirect: false,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  onCSVChange = (event) => {
    // Update the state
    this.setState({ csv: event.target.files[0] });
  };

  addCandidate = async (e) => {
    e.preventDefault();
    console.log(this.props.location.state.token);
    const newCandidate = {
      name: this.state.name,
      promises: this.state.promises,
      gender: this.state.gender,
      age: this.state.age,
    //   selectedFile: this.state.selectedFile,
    //   csv: this.state.csv,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": this.props.location.state.token,
      },
    };

    const url =
      "/api/elections/" + this.props.location.state.electionId + "/candidates";
    console.log(url);

    try {
      const res = await axios.post(url, [newCandidate], config);
      console.log(res);
    } catch (error) {
      const response = error.response;
      console.log(response.data);
    }
  };

  onFinish = (e) => {
    this.addCandidate(e);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <div className="container-contact100" style={styles}>
          <div className="wrap-contact100" style={styles2}>
            <span className="contact100-form-title" style={{ paddingTop: 20 }}>
              Candidate Details
            </span>

            <div className="wrap-input100 validate-input">
              <label className="label-input100">Name</label>
              <input
                id="name"
                className="input100"
                type="text"
                placeholder="Enter the election name..."
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input">
              <label className="label-input100">Age</label>
              <input
                type="number"
                placeholder="Age"
                className="input100"
                name="age"
                value={this.state.age}
                onChange={this.onChange}
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input">
              <label className="label-input100">Gender </label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={this.onChange}
              />
              <span className="lead"> Male </span>
              <br />
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={this.onChange}
              />
			  <span className="lead"> Female </span>
              <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input">
              <label className="label-input100">Manifesto </label>
              <input
                type="text"
                placeholder="promises"
                className="input100"
                name="promises"
                value={this.state.promises}
                onChange={this.onChange}
                required
              />
              <span className="focus-input100"></span>
            </div>
            {/* 
					<div className="form-group">
						<input 
							type="reset" 
							value="Add Candidate"
						/>
					</div>					 */}

			<div className="wrap-input100 validate-input">
              <label className="label-input100">Upload Candidate image : </label>              
              <input type="file" className="input100" onChange={this.onFileChange} />
            </div>

			<div className="wrap-input100 validate-input">
              <label className="label-input100">Upload Voters list : </label>               
              <input type="file" className="input100" onChange={this.onCSVChange} />
            </div>

            <div className="container-contact100-form-btn">
              <button
                className="contact100-form-btn"
                onClick={this.addCandidate}
              >
                Add Candidate
              </button>
            </div>

            <br />

            <div className="container-contact100-form-btn">
              <button className="contact100-form-btn" onClick={this.onFinish}>
                Save and Finish
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const styles = {
  backgroundColor: "#f4f4f4",
  paddingLeft: 400,
  paddingRight: 400,
  width: "100%",
};

const styles2 = {
  backgroundColor: "white",
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 20,
  paddingTop: 30,
  width: "100%",
};

export default AddCandidate;
