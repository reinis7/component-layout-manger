import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { COMPONENT_TYPES } from 'helper/commonNames'

const ToolPanelWrapper = styled.div`
    width: 200px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding-top: 3rem;
    padding-left: 3rem;
`;
const DragSelectedItem = styled.button`
    border : white 2px solid;
    outline: none;
    height: 2rem;
    margin: 0.25rem;
    background-color: transparent;
    color: white;
    width: 10rem;
  
`;

const ClearButton = styled.button`
    height: 2rem;
    margin: 0.25rem;
    width: 10rem;  
`;

export default function ToolPanel({ onDeleteButtonClicked }) {

  return (
    <ToolPanelWrapper>
      {
        _.toPairs(COMPONENT_TYPES).map(([key, item]) =>
          <DragSelectedItem
            key={key}
            className="droppab le-element"
            draggable={true}
            unselectable="on"
            onDragStart={e => e.dataTransfer.setData("text/plain", key)}
          >
            {item.label}
          </DragSelectedItem>
        )
      }
      {/* <ClearButton
        onClick={() => onDeleteButtonClicked()}
      >
        Clear ALL
      </ClearButton> */}
    </ToolPanelWrapper >
  )
}

ToolPanel.defaultProps = {
  onDeleteButtonClicked: () => { console.log('onDeleteButtonClicked') }
}