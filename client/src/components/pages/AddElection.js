import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class AddElection extends Component {
	state = {
		name: '',
		description: '',
		startTime: '',
		endTime: '',
		selectedFile: null,
		electionId: ''
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
				'x-auth-token': this.props.app.token
			}
		};

		let formData = new FormData();
		if (this.state.selectedFile !== null) {
			formData.append(
				'image',
				this.state.selectedFile,
				this.state.selectedFile.name
			);
		}
		formData.append('name', this.state.name);
		formData.append('description', this.state.description);
		formData.append('startTime', this.state.startTime);
		formData.append('endTime', this.state.endTime);
		console.log(formData);

		try {
			const res = await axios.post(
				'http://localhost:3000/api/elections',
				formData,
				config
			);
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
						Last Modified:{' '}
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
		if (this.state.electionId !== '') {
			return (
				<Redirect
					to={{
						pathname: '/admin/candidates',
						state: {
							electionId: this.state.electionId,
							token: this.props.app.token
						}
					}}
				/>
			);
		}
		return (
			<Fragment>
				<h1 className="large text-primary">Election Details</h1>
				<p className="lead">Host your own Election</p>
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
							type="description"
							placeholder="Description"
							name="description"
							value={this.state.description}
							onChange={this.onChange}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="datetime-local"
							placeholder="Start Time"
							name="startTime"
							value={this.state.startTime}
							onChange={this.onChange}
							required
						/>
					</div>

					<div className="form-group">
						<input
							type="datetime-local"
							placeholder="End Time"
							name="endTime"
							value={this.state.endTime}
							onChange={this.onChange}
							required
						/>
					</div>
				</form>

				<div className="form-group">
					<input
						type="file"
						className="img"
						onChange={this.onFileChange}
					/>
				</div>

				<div>
					<button className="btn btn-primary" onClick={this.onSubmit}>
						Next
					</button>
				</div>
			</Fragment>
		);
	}
}

export default AddElection;
