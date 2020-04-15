import React, { Fragment, Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export class AddElection extends Component {
  state = {
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    selectedFile: null,
    electionId: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": this.props.app.token,
      },
    };

    const body = {
      name: this.state.name,
      description: this.state.description,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      // selectedFile: this.state.selectedFile,
    };

    console.log(body);

    try {
      const res = await axios.post("/api/elections", body, config);
      console.log(res);
      console.log(res.data._id);
      this.setState({ electionId: res.data._id });
    } catch (error) {
      const response = error.response;
      console.log(response.data);
    }
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    if (this.state.electionId !== "") {
      return (
        <Redirect
          to={{
            pathname: "/admin/candidates",
            state: {
              electionId: this.state.electionId,
              token: this.props.app.token,
            },
          }}
        />
      );
    }
    return (
      <Fragment>
        <div className="container-contact100" style={styles}>
          <div className="wrap-contact100" style={styles2}>
              <span className="contact100-form-title" style={{paddingTop : 20}}>Election Details</span>

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
                <label className="label-input100">Description</label>
                <input
                  id="description"
                  className="input100"
                  type="text"
                  placeholder="Enter election description..."
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  required
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input">
                <label className="label-input100">Start Date</label>
                <input
                  className="input100"
                  type="datetime-local"
                  placeholder="Start Time"
                  name="startTime"
                  value={this.state.startTime}
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="wrap-input100 validate-input">
                <label className="label-input100">End Date</label>
                <input
                  className="input100"
                  type="datetime-local"
                  placeholder="End Time"
                  name="endTime"
                  value={this.state.endTime}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="wrap-input100 validate-input">
                <label className="label-input100">Election Image</label>
                <input
                  className="input100"
                  type="file"
                  className="img"
                  onChange={this.onFileChange}
                />
              </div>
            <div className="container-contact100-form-btn">
                  <button
                    className="contact100-form-btn"
                    onClick={this.onSubmit}
                  >
                    Next
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

export default AddElection;
