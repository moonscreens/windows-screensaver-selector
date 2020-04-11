import styled from '@emotion/styled';

import { window_shadow } from './Styles';

export default styled.div`
	position: relative;
    background: #C0C0C0;
    border: 1px solid white;
    border-bottom: 1px solid #808080;
    border-right: 1px solid #808080;
    font-size: 8pt;
    padding: 4px 12px;
    margin: 3px;
    display: inline-block;
    ${window_shadow}

    outline: none;
    &:active {
        background: #BDBEBD;
        box-shadow: inset 0px 0px 0px 1px #7B7D7B;
        border: 1px solid black;
        &:after {
            position: absolute;
            top: 3px;
            left: 3px;
            width: calc(100% - 8px);
            height: calc(100% - 8px);
            content: ' ';
            border: 1px dotted black;
        }
    }
    &:disabled {
        text-shadow: 1px 1px 0px white;
    }
`;