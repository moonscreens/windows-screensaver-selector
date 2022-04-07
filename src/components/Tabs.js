import React from 'react';
import styled from '@emotion/styled';

import { window_shadow } from './Styles';

const TabsContainer = styled.div`
	padding: 5px;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
`;
const Tabs = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	padding-left: 2px;
	position: relative;
	z-index: 5;
`;
const Tab = styled.div`
	position: relative;
	background: #C0C0C0;

	padding: 3px;
	border: 1px outset #ffffff;
	border-right: 1px solid black;
	border-bottom: none;
	border-radius: 2px 2px 0 0;

	&.active {
		padding: 4px;
		border-bottom: 1px solid #C0C0C0;
		box-shadow: 0px 1px 0px #C0C0C0;
		margin: -1px;
		z-index: 2;
	}

	&[data-disabled="true"] {
		color: grey;
		text-shadow: 1px 1px 0 #fff;
	}
`;

const TabContentContainer = styled.div`
	${window_shadow}
	position: relative;
	border: 1px outset #fff;
	padding: 13px;
	min-height: 370px;
	box-sizing: border-box;
`;


class TabComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: this.props.activeTab,
		}
	}


	activateTab(e) {
		this.setState({
			activeTab: Number(e.currentTarget.dataset.tab),
		});
	}


	render() {
		const tabTitles = [];
		let TabContent = null;
		for (let index = 0; index < this.props.children.length; index++) {
			const tab = this.props.children[index];

			if (index === this.state.activeTab) {
				TabContent = tab;
			}
			tabTitles.push(<Tab
				key={index}
				className={index === this.state.activeTab ? 'active' : ''}
				data-tab={index}
				data-disabled={tab.props.disabled}
				/*onClick={this.activateTab.bind(this)}*/>
				{tab.props.tab}
			</Tab>);
		}

		return (
			<TabsContainer style={this.state.style}>
				<Tabs>
					{tabTitles}
				</Tabs>

				<TabContentContainer>
					{TabContent}
				</TabContentContainer>
			</TabsContainer>
		);
	}
}

TabComponent.defaultProps = {
	activeTab: 0,
}

export default TabComponent;
