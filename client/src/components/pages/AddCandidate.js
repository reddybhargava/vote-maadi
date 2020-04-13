import React, { Fragment, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {v4 as uuid} from 'uuid';

export class AddCandidate extends Component {
	state = {
        name: '',
        promises: '',
        gender: '',
		age: ''
	};

	onChange = (e) => this.setState({ [e.target.name] : e.target.value });

  	addCandidate = async (e) => {
		e.preventDefault();
		console.log(this.props.location.state.token);
		const newCandidate = {
		//   id: uuid.v4(),
		  name: this.state.name,
		  promises: this.state.promises,
		  gender: this.state.gender,
		  age: this.state.age
		}
		const config = {
			headers: {
			  "Content-Type": "application/json",
			  "x-auth-token": this.props.location.state.token
			}
		  };

		const url = "http://localhost:3000/api/elections/" +this.props.location.state.electionId + "/candidates";
		console.log(url);

		try {
			const res = await axios.post(
			  url,
			  [newCandidate],
			  config
			);
			console.log(res);
		  } catch (error) {
			const response = error.response;
			console.log(response.data);
		}
	}	

    
    onFinish =  () => {
		console.log("Hey");
	};

	render() {
		return (			
			<Fragment>
				<h1 className="large text-primary">Candidate Details</h1>
				<p className="lead">Fill in the candidate details</p>
				<form className="form">
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
							type="number"
							placeholder="Age"
							name="age"
							value={this.state.age}
							onChange={this.onChange}
							required
						/>
					</div>

                    <div className="form-group">
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={this.onChange}
                        />
                        <span className="lead"> Male </span>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={this.onChange}
                        />
                        <span className="lead"> Female </span>
                    </div>

                    <div className="form-group">
						<input
							type="text"
							placeholder="promises"
							name="promises"
							value={this.state.promises}
							onChange={this.onChange}
							required
						/>
					</div>
					<div className="form-group">
						<input 
							type="reset" 
							value="Add Candidate"
						/>
						{/* </input> */}
					</div>
					
				</form>
						<button className="btn btn-primary" onClick={this.addCandidate}> Add Candidate</button>
				<div>
                        <button className="btn btn-primary" onClick={this.onFinish}> Save and Finish</button>
				</div>
		</Fragment>
		)
	}
}

export default AddCandidate;

