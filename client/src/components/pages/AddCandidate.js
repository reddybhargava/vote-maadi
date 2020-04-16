import React, { Fragment, Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export class AddCandidate extends Component {
	state = {
		name: '',
		promises: '',
		gender: '',
		age: '',
		selectedFile: null,
		redirect: false
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onFileChange = (event) => {
		// Update the state
		this.setState({ selectedFile: event.target.files[0] });
	};


	clearAllFields = () => {
		this.setState({
			name: '',
			promises: '',
			gender: '',
			age: '',
			selectedFile: null
		});
	};

	addCandidate = async (e) => {
		e.preventDefault();

		let formData = new FormData();
		if (this.state.selectedFile !== null) {
			formData.append(
				'image',
				this.state.selectedFile,
				this.state.selectedFile.name
			);
		}

		formData.append('name', this.state.name);
		formData.append('promises', this.state.promises);
		formData.append('gender', this.state.gender);
    formData.append('age', this.state.age);
    
    console.log(formData);

		const config = {
			headers: {
				'x-auth-token': this.props.location.state.token
			}
		};

		const url =
			'http://localhost:3000/api/elections/' +
			this.props.location.state.electionId +
			'/candidates';

		try {
			this.clearAllFields();
			const res = await axios.post(url, formData, config);
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

export default AddCandidate;

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
