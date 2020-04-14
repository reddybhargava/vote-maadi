import React, { Component } from 'react'
import axios from 'axios'
import "./view_election.css";
import { Redirect } from 'react-router-dom';
import './election.css'
import ViewCandidates from './ViewCandidates';
import "./view_election.css";


export class Election extends Component {

    state = {
        candidates: []
    }

    getCandidates = async () => {
		// e.preventDefault();
		console.log(this.props.location.state.token);
		const config = {
			headers: {
			  "Content-Type": "application/json",
			  "x-auth-token": this.props.location.state.token
			}
		  };

		const url = "/api/elections/" +this.props.location.state.electionId + "/candidates";
		console.log(url);

		try {
			const res = await axios.get(
			  url,
			  config
			);
            console.log(res);
            this.setState({candidates : res.data})
		  } catch (error) {
			const response = error.response;
            console.log(response.data);
            
		}
	}

    render() 
    {
        if(this.props.location.state.token === '')
        {
            return <Redirect to="/accounts/signin" />;
        }
        if(this.state.candidates.length === 0)
        {
            this.getCandidates();
        }
           
        const items = this.state.candidates.map((item, key) =>
            <ViewCandidates item={item} key={item._id} token={this.props.location.state.token} electionId={this.props.location.state.electionId} />
        );

        return (
            <div>
                <h1>
                    Election
                </h1>

                <ul>
                    <div className="election">
                        {items}
                    </div>
                </ul>

            </div>
        )
    }
}

export default Election;