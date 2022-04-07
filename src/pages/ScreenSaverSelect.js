import React from 'react';
import styled from '@emotion/styled';


import SettingsContainer from '../components/SettingsContainer';
import Select from '../components/Select';
import { getListOfScreensavers } from '../utils/common';

const Monitor = styled.div`
	background-image: url('/monitor.png');
	width: 184px;
	height: 169px;
	padding: 16px 16px 40px 15px;
	box-sizing: border-box;

	margin: auto auto 20px auto;

	& > div {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border: none;
		background-color: #008083;
		background-position: center;
		background-repeat: no-repeat;
	}
`;
const CreditsContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: #ffffff;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;
	box-sizing: border-box;
	&.clear {
		background: transparent;
	}
`;

const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

class ScreenSaverSelect extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			screensaverKey: "Blank",
			screensavers: {
				"blank": {
					name: "Blank",
					src: "https://3d-pipes.opl.io",
					index: 0,
				}
			},
			category: "classic",
			categories: ["classic"],
			screensaverNames: ["Blank"],
		}

		this.props.onChange({
			url: this.state.screensavers[this.state.screensaverKey.toLowerCase()].src
		});

		this.params = (new URL(document.location)).searchParams;

		this.isNode = this.params.get("role") === "node";
	}

	socketConnect() {
		this.socket = new WebSocket(`${this.params.get("wss").match(/localhost/) ? 'wss' : 'wss'}://${this.params.get("wss")}/?channel=${this.params.get("channel")}`);

		// Connection opened
		/*this.socket.addEventListener('open', function () {
		});*/

		this.socket.addEventListener('close', function () {
			setTimeout(this.socketConnect.bind(this), 1000);
		}.bind(this));

		// Listen for messages
		this.socket.addEventListener('message', this.handleSocketMessage.bind(this));
	}

	handleSocketMessage(event) {
		const data = JSON.parse(event.data);
		switch (data.type) {
			case 'verify':
				// Verify the client
				this.socket.send(JSON.stringify({
					type: "verify",
					token: this.params.get("token"),
				}));
				break;
			case 'verificationComplete':
				this.socket.send(JSON.stringify({
					type: "broadcast",
					message: "Hello from the server!"
				}));
				break;
			case 'switch':
				console.log("switch", data.message);
				this.screensaverSwitch(data.message);
				break;
			case 'refresh':
				window.location.reload();
				break;
			case 'ping':
				console.log(`Ping with ${Date.now() - data.message}ms of latency`);
				this.socket.send(JSON.stringify({
					type: "pong",
					message: Date.now()
				}));
				break;
			case 'pong':
				console.log(`Pong with ${Date.now() - data.message}ms of latency`);
				break;
			case 'count':
				this.setState({
					verifiedClients: data.message.verified,
					clients: data.message.total,
				})
				break;
			default:
				console.log("unknown server message", data);
				break;
		}
	}

	componentDidMount() {
		getListOfScreensavers().then(list => {
			const screensavers = {};
			const categoryObj = {}
			for (let index = 0; index < list.length; index++) {
				const element = {
					content: list[index].content,
					...list[index].metadata
				};
				element.index = index;
				screensavers[element.name.toLowerCase()] = element;
				categoryObj[element.category] = true;
			}

			const screensaverNames = this.getCategoryList(screensavers, this.state.category);

			this.setState({
				screensavers,
				screensaverNames,
				categories: Object.keys(categoryObj),
			}, () => { this.screensaverSwitch() });

			if (this.params.get("wss") !== null) {
				this.socketConnect();
			}
		});
	}

	updateCategory(category) {
		console.log("updating to", category);
		const screensaverNames = this.getCategoryList(this.state.screensavers, category);
		this.setState({
			category,
			screensaverNames,
		});
	}

	screensaverSwitch(screensaver = "Blank") {
		this.updateCategory(this.state.screensavers[screensaver.toLowerCase()].category);

		this.props.onChange({
			url: this.state.screensavers[screensaver.toLowerCase()].src
		});
		if (this.select) {
			this.select.setValue(screensaver);
		}
		this.setState({
			screensaverKey: screensaver.toLowerCase(),
			credits: false,
		})
	}

	toggleCredits() {
		if (this.state.credits) {
			this.setState({
				credits: false
			});
		} else {
			this.setState({
				credits: this.state.screensavers[this.state.screensaverKey.toLowerCase()].credits
			});
		}
	}

	screensaverSwitchListener(value) {
		this.screensaverSwitch(value);
		if (this.socket) {
			this.socket.send(JSON.stringify({
				type: "switch",
				data: value,
			}));
		}
	}

	getCategoryList(list, category = this.state.category) {
		const finalScreensaverList = [];
		for (const key in list) {
			if (Object.hasOwnProperty.call(list, key)) {
				const element = list[key];
				if (element.category.toLowerCase() === category.toLowerCase()) {
					finalScreensaverList.push(element.name);
				}
			}
		}
		return finalScreensaverList;
	}

	categorySwitchListener(value) {
		this.updateCategory(value);
	}

	setSelectRef(ref) {
		this.select = ref;
	}

	render() {
		const screensaver = this.state.screensavers[this.state.screensaverKey.toLowerCase()];

		if (this.isNode) {
			return <span></span>;
		}

		return (
			<div>
				<Monitor>
					<div>{
						this.state.credits ? <CreditsContainer>
							{this.state.credits}
						</CreditsContainer> : <CreditsContainer className='clear'>
							clients: {this.state.clients} <br /> verified clients: {this.state.verifiedClients}
						</CreditsContainer>
					}</div>
				</Monitor>
				<SettingsContainer title="Screen Saver">
					<Row>
						<Select ref={this.setSelectRef.bind(this)} options={this.state.screensaverNames} selected={screensaver.name} onChange={this.screensaverSwitchListener.bind(this)} />
						<button disabled style={{ marginLeft: '5px', marginRight: '5px' }}>
							Settings...
						</button>
						<button onClick={this.toggleCredits.bind(this)}>
							Credits
						</button>
					</Row>
				</SettingsContainer>
				<SettingsContainer title="Category">
					<Row style={{ margin: '6px 0px 0px 0px' }}>
						<Select options={this.state.categories} selected={this.state.category} onChange={this.categorySwitchListener.bind(this)} />
					</Row>
				</SettingsContainer>
				<SettingsContainer title="Energy saving features of monitor">
					<Row style={{ flexWrap: "nowrap" }}>
						<img alt="Moon Star" src="/energystar.png" style={{ margin: '5px 20px 0px', pointerEvents: 'none' }} />
						<div>
							<Row>
								{this.params.get("wss") === null ? "To adjust the power settings for your monitor, click Settings" : "Run into an issue? Try refreshing!"}
							</Row>
							<Row style={{ justifyContent: "flex-end" }}>
								{this.params.get("wss") === null ? <button>Settings...</button> : <button onClick={() => {
									this.socket.send(JSON.stringify({
										type: "refresh",
									}));
									window.location.reload();
								}}>
									Refresh
								</button>}
							</Row>
						</div>
					</Row>
				</SettingsContainer>
			</div>
		);
	}
}

ScreenSaverSelect.defaultProps = {
	title: "Untitled",
}

export default ScreenSaverSelect;
