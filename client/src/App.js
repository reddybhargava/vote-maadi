import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './store'

class App extends Component {

	state = {
		loggedIn: false,
		name: ''
	}

	logIn = () => {
		this.setState({loggedIn: true})
	}

	setName = (user) => {
		this.setState({name : user})
	}

	render() {		
		return (
		<Router>
			<Fragment>
				<Navbar />
				<Route exact path="/" component={Landing} />
				<section className="container">
					<Switch>
						<Route exact path="/accounts/signup" component={ () => <SignUp logIn={this.logIn} setName={this.setName} app={this.state}/>} />
						<Route exact path="/accounts/signin" component={ () => <SignIn logIn={this.logIn} setName={this.setName} app={this.state}/>} />
					</Switch>
				</section>
			</Fragment>
		</Router>
	);}
}

export default App;
