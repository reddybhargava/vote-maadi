import React, {Component, Fragment} from 'react';
import axios from 'axios';

class ViewCandidates extends Component {

    castVote = async (e) => {
		e.preventDefault();
		console.log(this.props.token);

		const config = {
			headers: {
			  "Content-Type": "application/json",
			  "x-auth-token": this.props.token
			}
		  };

		const url = "/api/elections/" + this.props.electionId + "/votes";
		console.log(url);

		try {
			const res = await axios.post(
			  url,
			  { candidateID: this.props.item._id },
			  config
			);
			console.log(res);
		  } catch (error) {
			const response = error.response;
			console.log(response.data);
		}
	}

    render() {
        return (

        <div className='product'>

                <Fragment>
                    <img src={this.props.item.imageURL} />
                    <h2 className='header'>{this.props.item.name}</h2>
                    <br />
                    <p className='description'> {this.props.item.promises} </p>
                    <br />
                    <div className='btn'>
                        <button className='vote' onClick={this.castVote}> VOTE! </button>
                    </div>                    
                </Fragment>  

        </div>
        );
    }
}

export default ViewCandidates;