import React from 'react';
import Window from './components/Window';
import './App.css';

import Tabs from './components/Tabs';
import ScreenSaverSelect from './pages/ScreenSaverSelect';

import styled from '@emotion/styled';

if (window.location.host.match(/localhost/) < 0) {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function () {
			navigator.serviceWorker.register('/service-worker.js');
		});
	}
}


const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;
const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	&[disabled] {
		display: none;
	}
`;
const Frame = styled.iframe`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: none;
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.params = (new URL(document.location)).searchParams;
		this.isController = this.params.get("role") === "controller";
		this.isNode = this.params.get("role") === "node";

		this.state = {
			lastInteraction: 0,
			delay: 2500,
			hidden: !this.isController,
			screensaverURL: this.isNode ? 'https://moon-classic.opl.io/' : 'https://blank.opl.io/',
		}

	}

	componentDidMount() {
		if (!this.isController) {
			window.addEventListener('mousemove', this.mouseMoveListener.bind(this));
		}
	}

	mouseMoveListener() {
		if (this.isNode) return;
		if (this.state.hidden && this.state.lastInteraction + this.state.delay < Date.now()) {
			this.setState({
				hidden: false,
				lastInteraction: Date.now(),
			})
		}
	}

	exitListener() {
		if (this.isController) return;

		this.setState({
			hidden: true,
			lastInteraction: Date.now(),
		})
	}

	screensaverChangeListener(e) {
		let string = e.url.split('#')[0];
		string += (e.url.includes('?') ? '&' : "?") + this.params.toString().replace('channel=', 'channels=');
		string += + (e.url.split('#')[1] || '');

		this.setState({
			screensaverURL: string.replace(/(\?|&|\?0|&0)$/, ''),
		})
	}

	render() {
		return (
			<>
				{this.isController ? <></> : <Frame src={this.state.screensaverURL} />}
				<Wrapper disabled={this.state.hidden}>
					<Window title="Display Properties" controlHelp={true} fullWidth={this.isController} onExit={this.exitListener.bind(this)} onMinimize={this.exitListener.bind(this)} width="409" height="484">
						<Tabs activeTab={1}>
							<div tab="Background" disabled>
								First tabs content
							</div>
							<div tab="Screen Saver">
								<ScreenSaverSelect onChange={this.screensaverChangeListener.bind(this)} />
							</div>
							<div tab="Appearance" disabled>
								Third tabs content
							</div>
							<div tab="Settings" disabled>
								Fourth tabs content
							</div>
						</Tabs>

						<Row style={{ justifyContent: 'flex-end' }}>
							<button disabled={this.isController} onClick={this.exitListener.bind(this)}>Ok</button>
							<button disabled={this.isController} onClick={this.exitListener.bind(this)} style={{ margin: '0px 5px' }}>Cancel</button>
							<button disabled={this.isController} onClick={this.exitListener.bind(this)} style={{ marginRight: '4px' }}>Apply</button>
						</Row>
					</Window>
				</Wrapper>
			</>
		);
	}
}

export default App;
