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

	finish = (candidate) => {
		this.addCandidate(candidate);
	}

	// onComponentDidMount() {
	// 	const id = this.props.location.state.electionId
	// 	console.log(id)
	// 	this.setState({ electionId : id })
	// }

	render() {

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
