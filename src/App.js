import React from 'react';
import Window from './components/Window';
import './App.css';

import Tabs from './components/Tabs';
import ScreenSaverSelect from './pages/ScreenSaverSelect';
import Cursor from './components/Cursor';
import Button from './components/Button';

import styled from '@emotion/styled';


const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
	align-items: center;
`;

class App extends React.Component {
	render () {
		return (
			<>
				<Cursor />
				<Window title="Display Properties" controlHelp={true}>
					<Tabs activeTab={1}>
						<div tab="Background">
							First tabs content
						</div>
						<div tab="Screen Saver">
							<ScreenSaverSelect />
						</div>
						<div tab="Appearance">
							Third tabs content
						</div>
						<div tab="Settings">
							Fourth tabs content
						</div>
					</Tabs>
					
					<Row style={{justifyContent: 'flex-end'}}>
						<Button>Ok</Button>
						<Button>Cancel</Button>
						<Button style={{marginRight: '5px'}}>Apply</Button>
					</Row>
				</Window>
			</>
		);
	}
}

export default App;



