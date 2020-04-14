import React, {Component, Fragment} from 'react';
import Election from './Election';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


class ViewElection extends Component {

    check = () => {
        // console.log("Hey");
        // console.log(this.props.item._id);
        // return <ViewCandidates components={this.props.item} />;
    }

    render() {
        return (

        <div className='product'>
            <Link to={
                    { pathname: "/view/ongoing/election", 
                      state: { electionId: this.props.item._id,
                               token: this.props.token
                    }, 
                    }} >; 
                <Fragment>
                    <img src={this.props.item.imageURL} />
                    <h2 className='header'>{this.props.item.name}</h2>
                    <br />
                    <p className='description'> {this.props.item.description} </p>
                    <br />
                    <div className='btn'>VOTE!</div>                    
                </Fragment>      

            </Link>
        </div>
        );
    }
}

export default ViewElection;