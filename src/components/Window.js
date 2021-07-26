import React from 'react';
import styled from '@emotion/styled';

const WindowContainer = styled.div`
    transform: scale(1);
    min-width: 409px;
	box-sizing: border-box;
	position: absolute;
`;

class Window extends React.Component {
	constructor(props) {
		super(props);
		this.isController = (document.location.search.match(/controller/) !== null);

		this.state = {
			style: {
				left: this.props.x + 'px',
				top: this.props.y + 'px',
				width: this.props.width + 'px',
				height: this.props.height + 'px',
				minWidth: this.props.minWidth + 'px',
				minHeight: this.props.minHeight + 'px',
			},
		}

		if (!this.isController) {
			if (this.props.x === 'auto') {
				this.state.style.left = Math.floor(window.innerWidth / 2 - this.props.width / 2) + 'px';
			}
			if (this.props.y === 'auto') {
				this.state.style.top = Math.floor(window.innerHeight / 2 - this.props.height / 2) + 'px';
			}
		} else {
			this.state.style = {
				top: '0',
				left: '0',
				width: "100%",
				height: "100%",
				minWidth: '0',
				minHeight: '0',
			}
		};
	}

	updatePosition(x, y) {
		let temp = Object.assign({}, this.state.style);
		this.setState({
			style: Object.assign(temp, {
				left: x + 'px',
				top: y + 'px',
			})
		});
	}

	mouseDownListener(e) {
		if (!e.target.dataset.role) {
			this.mouseDown = true;
			this.mouseStart = {
				x: e.pageX,
				y: e.pageY,
			}
			this.windowStart = {
				x: Number(this.state.style.left.split('px')[0]),
				y: Number(this.state.style.top.split('px')[0]),
			}
		}
	}
	mouseMoveListener(e) {
		if (this.mouseDown) {
			this.updatePosition(
				(e.pageX - this.mouseStart.x) + this.windowStart.x,
				(e.pageY - this.mouseStart.y) + this.windowStart.y
			);
		}
	}

	mouseUpListener(e) {
		this.mouseDown = false;
	}
	componentDidMount() {
		if (!this.isController) {
			this.mouseMoveListenerFunc = this.mouseMoveListener.bind(this);
			this.mouseUpListenerFunc = this.mouseUpListener.bind(this);

			window.addEventListener('mousemove', this.mouseMoveListenerFunc);
			window.addEventListener('mouseleave', this.mouseUpListenerFunc);
			window.addEventListener('onblur', this.mouseUpListenerFunc);
		}
	}
	componentWillUnmount() {
		if (!this.isController) {
			window.removeEventListener('mousemove', this.mouseMoveListenerFunc, true);
			window.removeEventListener('mouseleave', this.mouseUpListenerFunc, true);
			window.removeEventListener('onblur', this.mouseUpListenerFunc, true);
		}
	}

	render() {
		return (
			<WindowContainer className="window" onMouseUp={this.mouseUpListener.bind(this)} style={this.state.style}>
				<div className="title-bar" onMouseDown={this.mouseDownListener.bind(this)}>
					<div className="title-bar-text">{this.props.title}</div>
					<div className="title-bar-controls">
						<button onClick={this.props.onMinimize} aria-label="Minimize" />
						<button onClick={this.props.onMaximize} aria-label="Maximize" />
						<button onClick={this.props.onExit} aria-label="Close" />
					</div>
				</div>
				<div className="window-body">
					{this.props.children}
				</div>
			</WindowContainer>
		);
	}
}

Window.defaultProps = {
	title: "Untitled",
	controlHelp: false,
	controlExit: true,
	controlMinimize: false,
	controlMaximize: false,
	x: 'auto',
	y: 'auto',
	width: 409,
	height: 485,
	minWidth: 409,
	minHeight: 485,

	onMinimize: () => { },
	onMaximize: () => { },
	onExit: () => { },
}

export default Window;
