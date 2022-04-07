import React from 'react';
import uid from '../utils/uid';

class Checkbox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: this.props.active,
			uid: uid(),
		}
	}

	clickListener(e) {
		if (!this.props.disabled) {
			this.setState({
				active: !this.state.active,
			});
		}
	}

	render() {
		return <div>
			<input
				disabled={this.props.disabled}
				checked={this.state.active}
				type="checkbox"
				id={this.state.uid}
				onClick={this.clickListener.bind(this)} />
			<label htmlFor={this.state.uid}>{this.props.children}</label>
		</div>
	}
}


Checkbox.defaultProps = {
	active: false,
	disabled: false,
}

export default Checkbox;