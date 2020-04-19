import React from 'react';
import styled from '@emotion/styled';


import SettingsContainer from '../components/SettingsContainer';
import Button from '../components/Button';
import Select from '../components/Select';
import Checkbox from '../components/Checkbox';

const Monitor = styled.div`
	background-image: url(/monitor.png);
    width: 184px;
    height: 169px;
    padding: 16px 16px 40px 15px;
    box-sizing: border-box;

    margin: auto auto 20px auto;

    & > iframe, & > div {
        width: 100%;
		height: 100%;
		overflow: hidden;
		border: none;
    }
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
	align-items: center;
`;

const screensaverArray = [
	{
		name: 'Blank',
		src: 'https://blank.opl.io',
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
		name: 'Starfield',
		src: 'https://starfield.opl.io',
	},
];
const screensavers = {};
for (let index = 0; index < screensaverArray.length; index++) {
	const element = screensaverArray[index];
	screensavers[element.name] = element;
}

const screensaverNames = [];
for (let index = 0; index < screensaverArray.length; index++) {
	const element = screensaverArray[index];
	screensaverNames.push(element.name);
}

class ScreenSaverSelect extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			screensaverKey: screensaverArray[0].name,
		}
	}

	screensaverSwitchListener (e) {
		this.setState({
			screensaverKey: e.value,
		})
	}

	render() {
		const screensaver = screensavers[this.state.screensaverKey];

		return (
			<div>
				<Monitor>
					<iframe src={screensaver.src}></iframe>
				</Monitor>
				<SettingsContainer title="Screen Saver">
					<Row>
						<Select options={screensaverNames} onChange={this.screensaverSwitchListener.bind(this)} />
						<Button>
							Settings...
						</Button>
						<Button>
							Preview
						</Button>
					</Row>
					<Row style={{margin: '6px 0px 0px 0px'}}>
						<Checkbox>
							Password protected
						</Checkbox>
						<Button disabled={true} style={{margin: '0px 6px'}}>
							Change...
						</Button>
					</Row>
				</SettingsContainer>
				<SettingsContainer title="Energy saving features of monitor">
					<Row>
						<img alt="Moon Star" src="/energystar.png" style={{margin: '0 20px', pointerEvents: 'none'}} />
						<div>
							<Row>
								<Checkbox disabled={true}>
									Low-power standby
								</Checkbox>
							</Row>
							<Row style={{marginTop: '6px'}}>
								<Checkbox disabled={true}>
									Shut off monitor
								</Checkbox>
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
