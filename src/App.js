import React from 'react';
import Window from './components/Window';
import './App.css';

import Tabs from './components/Tabs';
import ScreenSaverSelect from './pages/ScreenSaverSelect';
import Cursor from './components/Cursor';

import styled from '@emotion/styled';


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

		this.state = {
			lastInteraction: 0,
			delay: 2500,
			hidden: true,

			screensaverURL: 'https://blank.opl.io/',
		}

		window.addEventListener('mousemove', this.mouseMoveListener.bind(this));
	}

	mouseMoveListener() {
		if (this.state.hidden && this.state.lastInteraction + this.state.delay < Date.now()) {
			this.setState({
				hidden: false,
				lastInteraction: Date.now(),
			})
		}
	}

	exitListener() {
		this.setState({
			hidden: true,
			lastInteraction: Date.now(),
		})
	}

	screensaverChangeListener(e) {
		this.setState({
			screensaverURL: e.url,
		})
	}

	render() {
		return (
			<>
				<Frame src={this.state.screensaverURL} />
				<Wrapper disabled={this.state.hidden}>
					<Cursor />
					<Window title="Display Properties" controlHelp={true} onExit={this.exitListener.bind(this)} onMinimize={this.exitListener.bind(this)}>
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
							<button onClick={this.exitListener.bind(this)}>Ok</button>
							<button onClick={this.exitListener.bind(this)} style={{ margin: '0px 5px' }}>Cancel</button>
							<button onClick={this.exitListener.bind(this)} style={{ marginRight: '4px' }}>Apply</button>
						</Row>
					</Window>
				</Wrapper>
			</>
		);
	}
}

export default App;



