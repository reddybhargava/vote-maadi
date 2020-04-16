import React, {Component, Fragment} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class ViewCandidates extends Component {

	state = {
		redirect : false
	}

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
			this.setState({redirect : true});
		  } catch (error) {
			const response = error.response;
			console.log(response.data);
		}
	}

    render() {

		if(this.state.redirect === true) {
			return <Redirect to='/' />;
		}

        return (

        <div className='product' style={{backgroundColor: '#f4f4f4'}}>

                <Fragment>
                    <img src={this.props.item.imageURL} styles={img_styles}/>
                    <h2 className='header'>{this.props.item.name}</h2>
                    <br />
                    <p className='description'> {this.props.item.promises} </p>
                    <br />
                    <div className='btn'>
                        <button className='button' onClick={this.castVote}> VOTE! </button>
                    </div>                    
                </Fragment>  

        </div>
        );
    }
}

const img_styles = {
    objectFit: 'cover',
    maxWidth: '250px',
    maxHeight: '350px'
}

export default ViewCandidates;