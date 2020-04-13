import React, { Component } from 'react'
import {v4 as uuid} from 'uuid'
import axios from 'axios'
import AddCandidate from './AddCandidate'

export class Candidate extends Component {
	state = {
		candidates : [],
		redirect : false,
		electionId : ''
	}

	addCandidate = (candidate) => {
		const newCandidate = {
		  id: uuid.v4(),
		  name: candidate.name,
		  promises: candidate.promises,
		  gender: candidate.gender,
		  age: candidate.age
		}
		console.log(newCandidate);
		this.setState({ candidates : [...this.state.candidates, newCandidate]})
	}

	onSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': this.props.app.token
			}
		}
		const { name, description, startTime, endTime } = this.state;
		const body = JSON.stringify({name, description, startTime, endTime});
		console.log(body);
		console.log(this.props.app.token);

		try {
			const res = await axios.post("http://localhost:3000/api/elections", 
			body,
			config
			);
			console.log(res);			
		  } catch(error){
			const response = error.response
			console.log(response.data)
		  }
	};

	finish = (candidate) => {
		this.addCandidate(candidate);
	}

	check() {
		//if(this.props.location)
		const id = this.props.location.state.electionId
		console.log(id)
		this.setState({ electionId : id })
	}

	render() {

		{
			if(this.state.electionId === '')
			{
				this.check();
			}
		}

		return (
			<div>
				<AddCandidate addCandidate={ this.addCandidate } />				
				{/* <button onClick={ this.check}> */}
				Hello World!
				{/* </button> */}
			</div>
		)
	}
}

export default Candidate
