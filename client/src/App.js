import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AddElection from './components/pages/AddElection';
import AddCandidate from './components/pages/AddCandidate';
import OngoingElections from './components/pages/OngoingElections';
import Election from './components/pages/Election';
import {v4 as uuid} from 'uuid';

class App extends Component {

	state = {
		loggedIn: false,
		name: '',
		// type: '',
		token: ''
	}

	logIn = () => {
		this.setState({loggedIn: true})
	}

	setName = (user) => {
		this.setState({name : user})
	}
	setToken = (token) => {
		this.setState({token: token})
	}

	render() {
			
		return (
		<Router>
			<Fragment>
				<Fragment>
					<Navbar app={this.state} />
					<Route exact path="/" component={Landing} />
				</Fragment>
				<section className="container" style={styles}>
					<Switch>
						<Route exact path="/view/ongoing" component={ () => <OngoingElections app={this.state} />} />
						<Route exact path="/view/ongoing/election" component={Election} />
						<Route exact path="/accounts/signup" component={ () => <SignUp logIn={this.logIn} setName={this.setName} setToken={this.setToken} app={this.state}/>} />
						<Route exact path="/accounts/signin" component={ () => <SignIn logIn={this.logIn} setName={this.setName} setToken={this.setToken} app={this.state}/>} />
						<Route exact path="/admin/elections" component={ () => <AddElection app={this.state} />} />
						<Route exact path="/admin/candidates" component={AddCandidate} />
					</Switch>
				</section>
			</Fragment>
		</Router>
	);}
}

const styles = {
	marginTop: 0,
	// paddingTop: 0,
	// paddingBottom: 0,
	// paddingLeft: 0,
	// paddingRight: 0,
	// marginLeft: 0,
	// marginRight: 0
}

export default App;
