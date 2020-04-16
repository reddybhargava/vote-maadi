import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import ReactLoading from 'react-loading';

export class ElectionResults extends Component {
	state = {
		electionID: this.props.location.state.electionId,
		electionName: this.props.location.state.electionName,
		candidates: {},
		candidateSentiments: {},
		chartReady: false,
		analyticsData: [],
		chart1: [],
		chart2: [],
		chart3: [],
		chart4: [],
		chart5: []
	};

	getChart1 = async () => {
		const url = `/api/elections/${this.state.electionID}/votes`;
		const res = await axios.get(url);

		let candidates = {},
			candidateSentiments = {};
		let data = res.data.votes.map((cand) => {
			candidates[cand.id] = cand.name;
			candidateSentiments[cand.id] = cand.sentiment;
			return [cand.name, cand.votes];
		});
		data.unshift(['Candidates', 'Votes']);

		this.setState({
			electionName: res.data.electionName,
			candidates: candidates,
			candidateSentiments: candidateSentiments
		});

		return data;
	};

	getChart2 = async () => {
		const url = `/api/elections/${this.state.electionID}/votes/analytics`;
		const res = await axios.get(url);
		this.setState({ analyticsData: res.data });

		const male = res.data.filter((ele) => ele.voterGender === 'Male')
			.length;
		const female = res.data.filter((ele) => ele.voterGender === 'Female')
			.length;
		const data = [
			['Gender', 'Votes'],
			['Male', male],
			['Female', female]
		];
		return data;
	};

	getChart3 = async () => {
		const res = this.state.analyticsData,
			candidates = this.state.candidates;
		let data = [['Candidate', 'Male', 'Female']];
		for (const candidateId in candidates) {
			const male = res.filter(
				(ele) =>
					ele.voterGender === 'Male' &&
					ele.candidateId === candidateId
			).length;
			const female = res.filter(
				(ele) =>
					ele.voterGender === 'Female' &&
					ele.candidateId === candidateId
			).length;
			data.push([candidates[candidateId], male, female]);
		}

		return data;
	};

	getChart4 = async () => {
		const res = this.state.analyticsData,
			candidates = this.state.candidates;
		res.sort((a, b) => a.timestamp - b.timestamp);

		let votes = {};
		for (const candidateId in candidates) {
			votes[candidateId] = 0;
		}

		const data = res.map((ele) => {
			votes[ele.candidateId] += 1;
			return [ele.timestamp, ...Object.values(votes)];
		});
		data.unshift(['Timestamp', ...Object.values(candidates)]);

		return data;
	};

	getChart5 = async () => {
		const { candidates, candidateSentiments } = this.state;

		let data = [['Candidates', 'Sentiments', { role: 'style' }]];
		for (const cand in candidates) {
			let color = candidateSentiments[cand].score < 0 ? 'red' : 'green';
			data.push([
				candidates[cand],
				candidateSentiments[cand].score,
				color
			]);
		}

		return data;
	};

	componentDidMount() {
		this.getChart1().then((res, err) => {
			this.setState({ chart1: res });

			this.getChart2().then((res, err) => {
				this.setState({ chart2: res });

				this.getChart3().then((res, err) => {
					this.setState({ chart3: res });
				});

				this.getChart4().then((res, err) => {
					this.setState({ chart4: res });
				});

				this.getChart5().then((res, err) => {
					this.setState({ chart5: res });
				});
			});
		});
	}

	render() {
		// if(this.state.electionID === '')
		// {
		// 	this.setState({electionID : this.props.location.state.electionId})
		// }
		return (
			<div>
				<div className={'my-pretty-chart-container'}>
					<Chart
						width="500px"
						height="300px"
						chartType="Bar"
						loader={
							<ReactLoading
								type="spinningBubbles"
								color="black"
								height={'20%'}
								width={'20%'}
							/>
						}
						data={this.state.chart1}
						options={{
							chart: {
								title: 'Votes for Candidates',
								subtitle: this.state.electionName
							},
							vAxis: {
								title: 'No. of Votes'
							},
							legend: {
								position: 'none'
							}
						}}
					/>
				</div>
				<div className={'my-pretty-chart-container'}>
					<Chart
						width="500px"
						height="300px"
						chartType="PieChart"
						loader={
							<ReactLoading
								type="spinningBubbles"
								color="black"
								height={'20%'}
								width={'20%'}
							/>
						}
						data={this.state.chart2}
						options={{
							title: 'Ratio of Male and Female Voters',
							subtitle: this.state.electionName
						}}
					/>
				</div>
				<div className={'my-pretty-chart-container'}>
					<Chart
						width="500px"
						height="300px"
						chartType="Bar"
						loader={
							<ReactLoading
								type="spinningBubbles"
								color="black"
								height={'20%'}
								width={'20%'}
							/>
						}
						data={this.state.chart3}
						options={{
							chart: {
								title: 'Votes for Candidates by Male/Female',
								subtitle: this.state.electionName
							}
						}}
					/>
				</div>
				<div className={'my-pretty-chart-container'}>
					<Chart
						width="1000px"
						height="500px"
						chartType="Line"
						loader={
							<ReactLoading
								type="spinningBubbles"
								color="black"
								height={'20%'}
								width={'20%'}
							/>
						}
						data={this.state.chart4}
						options={{
							chart: {
								title: 'Votes for Candidates over time',
								subtitle: this.state.electionName
							}
						}}
					/>
				</div>
				<div className="my-pretty-chart-container">
					<Chart
						width="800px"
						height="300px"
						chartType="BarChart"
						loader={
							<ReactLoading
								type="spinningBubbles"
								color="black"
								height={'20%'}
								width={'20%'}
							/>
						}
						data={this.state.chart5}
						options={{
							title: 'Votes for Candidates over time',
							subtitle: this.state.electionName,
							hAxis: {
								title: 'Sentiment',
								minValue: 0
							},
							vAxis: {
								title: 'Candidates'
							},
							legend: {
								position: 'none'
							}
						}}
					/>
				</div>
			</div>
		);
	}
}

export default ElectionResults;
