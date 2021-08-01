import React from 'react';
import styled from '@emotion/styled';


import SettingsContainer from '../components/SettingsContainer';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';
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
					src: "https://blank.opl.io",
					index: 0,
				}
			},
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
				this.screensaverSwitch(data.message);
				break;
			case 'refresh':
				window.location.reload();
				break;
			case 'ping':
				this.socket.send(JSON.stringify({
					type: "pong",
					message: Date.now()
				}));
				break;
			default:
				console.log("unknown server message", data);
				break;
		}
	}

	componentDidMount() {
		getListOfScreensavers().then(list => {
			const screensavers = {};
			for (let index = 0; index < list.length; index++) {
				const element = list[index];
				element.index = index;
				screensavers[element.name.toLowerCase()] = element;
			}

			const screensaverNames = [];
			for (let index = 0; index < list.length; index++) {
				const element = list[index];
				screensaverNames.push(element.name);
			}

			this.setState({
				screensavers,
				screensaverNames,
			}, () => { this.screensaverSwitch() });

			if (this.params.get("wss") !== null) {
				this.socketConnect();
			}
		});
	}

	screensaverSwitch(screensaver = "Blank") {
		this.props.onChange({
			url: this.state.screensavers[screensaver.toLowerCase()].src
		});
		if (this.select) {
			this.select.setValue(screensaver);
		}
		this.setState({
			screensaverKey: screensaver.toLowerCase(),
		})
	}

	screensaverSwitchListener(e) {
		this.screensaverSwitch(e.value);
		if (this.socket) {
			this.socket.send(JSON.stringify({
				type: "switch",
				data: e.value,
			}));
		}
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
					<div></div>
				</Monitor>
				<SettingsContainer title="Screen Saver">
					<Row>
						<Select ref={this.setSelectRef.bind(this)} options={this.state.screensaverNames} selected={screensaver.index} onChange={this.screensaverSwitchListener.bind(this)} />
						<button disabled style={{ marginLeft: '5px', marginRight: '5px' }}>
							Settings...
						</button>
						<button>
							Credits
						</button>
					</Row>
					<Row style={{ margin: '6px 0px 0px 0px' }}>
						<Checkbox disabled>
							Password protected
						</Checkbox>
						<button disabled={true} style={{ margin: '0px 6px' }}>
							Change...
						</button>
					</Row>
				</SettingsContainer>
				<SettingsContainer title="Energy saving features of monitor">
					<Row style={{ flexWrap: "nowrap" }}>
						<img alt="Moon Star" src="/energystar.png" style={{ margin: '5px 20px 0px', pointerEvents: 'none' }} />
						<div>
							<Row>
								To adjust the power settings for your monitor, click Settings
							</Row>
							<Row style={{ justifyContent: "flex-end" }}>
								<button disabled>
									Settings...
								</button>
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
