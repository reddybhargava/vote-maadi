import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Election from './components/pages/Election';
import Candidate from './components/pages/Candidate';
import './App.css';

class App extends Component {

	state = {
		loggedIn: false,
		name: '',
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
				<Navbar />
				<Route exact path="/" component={Landing} />
				<section className="container">
					<Switch>
						<Route exact path="/accounts/signup" component={ () => <SignUp logIn={this.logIn} setName={this.setName} setToken={this.setToken} app={this.state}/>} />
						<Route exact path="/accounts/signin" component={ () => <SignIn logIn={this.logIn} setName={this.setName} setToken={this.setToken} app={this.state}/>} />
						<Route exact path="/admin/elections" component={ () => <Election app={this.state} />} />
						<Route exact path="/admin/candidates" component={Candidate} />
					</Switch>
				</section>
			</Fragment>
		</Router>
	);}
}

export default App;
