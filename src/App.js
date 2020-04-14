import React from 'react';
import Window from './components/Window';
import './App.css';

import Tabs from './components/Tabs';
import ScreenSaverSelect from './pages/ScreenSaverSelect';
import Cursor from './components/Cursor';

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
				</Window>
			</>
		);
	}
}

export default App;



