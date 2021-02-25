
import React from 'react'
import styled from 'styled-components'

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

const DeleteButton = styled.button`
    height: 2rem;
    margin: 0.25rem;
    width: 10rem;  
`;

export default function ToolPanel() {

  const dragableAttr = React.useMemo(() => [
    {
      label: 'LINK',
      value: 'link'
    }, {
      label: 'TEXT',
      value: 'text'
    }, {
      label: 'IMAGE',
      value: 'image'
    }, {
      label: 'VIDEO',
      value: 'video'
    }, {
      label: 'CUSTOM HTML',
      value: 'custom_html'
    }
  ], [])



  return (
    <ToolPanelWrapper>
      {
        dragableAttr.map((item) =>
          <DragSelectedItem
            key={item.value}
            className="droppab le-element"
            draggable={true}
            unselectable="on"
            onDragStart={e => e.dataTransfer.setData("text/plain", item.value)}
          >
            {item.label}
          </DragSelectedItem>
        )
      }
    </ToolPanelWrapper >
  )
}
