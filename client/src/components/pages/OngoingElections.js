import React, { Component } from 'react'
import axios from 'axios'
import ViewElection from './ViewElection'
import "./view_election.css";
import "../../templates/css/main.css";


export class OngoingElections extends Component {

    state = {
        elections: []
    }

    render() 
    {
        if(this.state.elections.length === 0)
        {
            axios.get('/api/elections?status=ongoing')
            .then(res => {
                this.setState({elections : res.data});
                console.log(this.state.elections);
            }) 
        }
           
        const items = this.state.elections.map((item, key) =>
            <ViewElection item={item} key={item._id} token={this.props.app.token} />
        );

        return (
            <div style={styles}>
                <h1 style={heading}>
                    Elections
                </h1>
                <ul>
                    <div className="election" style={{paddingTop : '20px'}}>
                        {items}
                    </div>
                </ul>
            </div>
        )
    }
}

const styles = {
    backgroundColor: 'white',
    paddingTop : '100px',
    paddingLeft : '20px',
}

const heading = {
    marginBottom : '10px',
    fontSize: '50px'
}

export default OngoingElections;