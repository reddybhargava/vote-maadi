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

	main = { candidates : []};

	addCandidate = () => {
		// this.props.location.state.addCandidate(this.state);
		//console.log(this.props.location.state.electionId);
		console.log("Finish");		
	};
	
  	addCandidate = () => {
    console.log("Hey");
		const newCandidate = {
		  id: uuid.v4(),
		  name: this.state.name,
		  promises: this.state.promises,
		  gender: this.state.gender,
		  age: this.state.age
		}
		console.log(newCandidate);
		this.setState({ candidates : [...this.state.candidates, newCandidate]})
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
							type="textbox"
							placeholder="promises"
							name="promises"
							value={this.state.promises}
							onChange={this.onChange}
							required
						/>
					</div>
				</form>

				<div>
						<button className="btn btn-primary" onClick={this.addCandidate}> Add Candidate</button>
                        <button className="btn btn-primary" onClick={this.onFinish}> Save and Finish</button>
				</div>
		</Fragment>
		)
	}
}

export default AddCandidate;

