import React, { Component } from 'react'
import axios from 'axios'
import ViewResults from './ViewResults'
import "./view_election.css";
import "../../templates/css/main.css";


export class CompletedElections extends Component {

    state = {
        elections: []
    }

    render() 
    {
        if(this.state.elections.length === 0)
        {
            axios.get('/api/elections?status=completed')
            .then(res => {
                this.setState({elections : res.data});
                console.log(this.state.elections);
            }) 
        }
           
        const items = this.state.elections.map((item, key) =>
            <ViewResults item={item} key={item._id} />
        );

        return (
            <div style={styles}>
                <h1 style={heading}>
                    Election Results
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

export default CompletedElections;