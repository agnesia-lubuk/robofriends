// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import CardList from '../components/CardList';
// import SearchBox from '../components/SearchBox';
// import Scroll from '../components/Scroll';
// import ErrorBoundary from '../components/ErrorBoundary';
// import './App.css';

// import { setSearchField, requestRobots } from '../action';

// const mapStateToProps = (state) => {
// 	return {
// 		searchField: state.searchRobots.searchField,
// 		robots: state.requestRobots.robots,
// 		isPending: state.requestRobots.isPending,
// 		error: state.requestRobots.error
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
// 		onRequestRobots: () => dispatch(requestRobots())
// 	};
// };

// class App extends Component {
// 	componentDidMount() {
// 		this.props.onRequestRobots();
// 	}

// 	render() {
// 		const { searchField, onSearchChange, robots, isPending } = this.props;
// 		const filteredRobots = robots.filter((robot) => {
// 			return robot.name.toLowerCase().includes(searchField.toLowerCase());
// 		});
// 		return isPending ? (
// 			<h1>Loading</h1>
// 		) : (
// 			<div className="tc">
// 				<h1 className="f1">RoboFriends</h1>
// 				<SearchBox searchChange={onSearchChange} />
// 				<Scroll>
// 					<ErrorBoundary>
// 						<CardList robots={filteredRobots} />
// 					</ErrorBoundary>
// 				</Scroll>
// 			</div>
// 		);
// 	}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

function App() {
	const [ robots, setRobots ] = useState([]);
	const [ searchfield, setSearchfield ] = useState('');
	const [ count, setCount ] = useState(0); // for demo purposes

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()).then((users) => {
			setRobots(users);
		});
		// console.log(count)
	}, []); // if you add count, only run if count changes.

	const onSearchChange = (event) => {
		setSearchfield(event.target.value);
	};

	const filteredRobots = robots.filter((robot) => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	});

	return !robots.length ? (
		<h1>Loading</h1>
	) : (
		<div className="tc">
			<h1 className="f1">RoboFriends</h1>
			<button onClick={() => setCount(count + 1)}>Click Me!</button>
			<SearchBox searchChange={onSearchChange} />
			<Scroll>
				<CardList robots={filteredRobots} />
			</Scroll>
		</div>
	);
}

export default App;
