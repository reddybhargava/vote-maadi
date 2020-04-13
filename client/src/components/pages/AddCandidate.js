import React, { Fragment, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class AddCandidate extends Component {
	state = {
        name: '',
        promises: '',
        gender: '',
        age: ''
	};

	onChange = (e) => this.setState({ [e.target.name] : e.target.value });

	onSubmit = async (e) => {
        this.props.addCandidate.bind(this, this.state);
    };
    
    onFinish = async (e) => {
        this.props.finish.bind(this, this.state);
	};

	render() {
		return (			
			<Fragment>
				<h1 className="large text-primary">Candidate Details</h1>
				<p className="lead">Fill in the candidate details</p>
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

					{/* <div className="form-group">
						<input 
							type="file" 
							className="img" 
							onChange={this.onChange}
						/>
					</div> */}

					<div>
						<button className="btn btn-primary" onClick={this.onSubmit}> Add Candidate</button>
                        <button className="btn btn-primary" onClick={this.onFinish}> Save and Finish</button>
					</div>
				</form>
		</Fragment>
		)
	}
}

export default AddCandidate;

