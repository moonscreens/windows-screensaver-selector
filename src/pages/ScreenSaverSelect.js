import React from 'react';
import styled from '@emotion/styled';


import SettingsContainer from '../components/SettingsContainer';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

const Monitor = styled.div`
	background-image: url(/monitor.png);
    width: 184px;
    height: 169px;
    padding: 17px 16px 40px 16px;
    box-sizing: border-box;

    margin: auto auto 20px auto;

    & > iframe, & > div {
        width: 100%;
		height: 100%;
		overflow: hidden
    }
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
	align-items: center;
`;

class ScreenSaverSelect extends React.Component {
	constructor (props) {
		super(props);
		this.state = {

		}
	}


	render() {
		return (
			<div>
				<Monitor>
					<div style={{color: 'white'}}>
						What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills.
						I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words.
						You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands.
					</div>
				</Monitor>
				<SettingsContainer title="Screen Saver">
					<Row>
						<Button>
							Settings...
						</Button>
						<Button>
							Preview
						</Button>
					</Row>
				</SettingsContainer>
				<SettingsContainer title="Energy saving features of monitor">
					<Row>
						<img alt="Moon Star" src="/energystar.png" style={{margin: '0 20px'}} />
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
