'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

class App extends React.Component {
	render() {
		return (
			<div id='app'>
				<button onClick={this.previousPose}>Previous Pose</button>
				<button onClick={this.nextPose}>Next Pose</button>
			</div>
		)
	}
	previousPose() {
		$.ajax({
			url: '/previous',
			method: 'POST',
		});
	}
	nextPose() {
		$.ajax({
			url: '/next',
			method: 'POST',
		});
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
