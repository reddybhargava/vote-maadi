import React, { Component } from 'react'
import axios from 'axios'
import ViewElection from './ViewElection'
import "./view_election.css";


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
            <div>
                <h1>
                    Elections
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

export default OngoingElections;