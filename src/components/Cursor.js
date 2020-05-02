import React from 'react';
import styled from '@emotion/styled';

const CursorElement = styled.div`
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPjZIJDsAgCATRp9V326/RLA0GFcRJejq7sdpCRNzfjmtKxak9jeUpQWRmvgqIDG4CQwZZYJLBKbDJIAq4MvACoQzWwFEGNiA7iBcrpeybOskQ7P36G4xp6KA2IuR+oNfiIbIVT+31plFxly5qT9fZEsrajuOfKtEHjKJYo0XefREAAAAASUVORK5CYII=');
	background-repeat: no-repeat;
	background-position: top left;
	position: fixed;
	width: 11px;
	height: 19px;
	pointer-events: none;
	z-index: 999999;
`;

class Cursor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			display: 'none',
			left: 0,
			top: 0,
			lastInput: 0,
		}
		this.mouseListenerBound = this.mouseListener.bind(this);
	}

	intervalListener () {
		if (this.state.lastInput+5000 < Date.now()) {
			this.setState({
				display: 'none',
			})
		}
	}

	mouseListener (e) {
		this.setState({
			left: e.clientX,
			top: e.clientY,
			display: 'block',
			lastInput: Date.now(),
		});
	}
	componentDidMount () {
		window.addEventListener('mousemove', this.mouseListenerBound);
		this.state.interval = setInterval(this.intervalListener.bind(this), 1000);
	}
	componentWillUnmount () {
		window.removeEventListener('mousemove', this.mouseListenerBound);
		clearInterval(this.state.interval);
	}
	render () {
		return <CursorElement style={{
			display: this.state.display,
			left: this.state.left,
			top: this.state.top
		}} />
	}
}

export default Cursor;