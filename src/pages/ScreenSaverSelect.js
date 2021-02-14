import React from 'react';
import styled from '@emotion/styled';


import SettingsContainer from '../components/SettingsContainer';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';

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

const screensaverArray = [
	{
		name: 'Moon',
		src: 'https://moon-space.opl.io',
	},
	{
		name: '3D Pipes',
		src: 'https://3d-pipes.opl.io',
	},
	{
		name: '3D Text',
		src: 'https://3d-text.opl.io',
	},
	{
		name: '3D Flying Objects',
		src: 'https://3d-flying-objects.opl.io',
	},
	{
		name: 'Aquarium',
		src: 'https://aquarium.opl.io',
	},
	{
		name: 'Starfield',
		src: 'https://starfield.opl.io',
	},
	{
		name: 'Chat Racing',
		src: 'https://chat-racing.opl.io',
	},
	{
		name: 'PS2 (needs update)',
		src: 'https://ps2.opl.io',
	},
	{
		name: 'Space Station (in progress)',
		src: 'https://space-station.opl.io',
	},
	{
		name: 'Jimbo (kind of cringe lole)',
		src: 'https://jimbo.opl.io',
	},
	{
		name: 'Blank',
		src: 'https://blank.opl.io',
	},
];
const screensavers = {};
for (let index = 0; index < screensaverArray.length; index++) {
	const element = screensaverArray[index];
	element.index = index;
	screensavers[element.name] = element;
}

const screensaverNames = [];
for (let index = 0; index < screensaverArray.length; index++) {
	const element = screensaverArray[index];
	screensaverNames.push(element.name);
}

class ScreenSaverSelect extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			screensaverKey: screensaverArray[0].name,
		}

		if (localStorage.lastScreensaver && screensavers[localStorage.lastScreensaver]) {
			this.state.screensaverKey = localStorage.lastScreensaver;
		}

		this.props.onChange({
			url: screensavers[this.state.screensaverKey].src
		});
	}

	screensaverSwitchListener(e) {
		localStorage.lastScreensaver = e.value;

		this.setState({
			screensaverKey: e.value,
		})

		this.props.onChange({
			url: screensavers[e.value].src
		});
	}

	render() {
		const screensaver = screensavers[this.state.screensaverKey];

		return (
			<div>
				<Monitor>
					<div></div>
				</Monitor>
				<SettingsContainer title="Screen Saver">
					<Row>
						<Select options={screensaverNames} selected={screensaver.index} onChange={this.screensaverSwitchListener.bind(this)} />
						<button disabled style={{ marginLeft: '5px', marginRight: '5px' }}>
							Settings...
						</button>
						<button disabled>
							Preview
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
