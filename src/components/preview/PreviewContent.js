import React, { useEffect } from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

import useIsMounted from 'hooks/useIsMounted'
import { layoutState } from 'helper/layoutState';
import PreviewPanel from "./PreviewPanel";
import PreviewComponent from "./PreviewComponent";


const ReactGridLayout = WidthProvider(RGL);
const DROPPING_ITEM = 'DROPPING_ITEM';

const PreviewContent = React.forwardRef((props, ref) => {

  const [newCounter, setNewCounter] = React.useState(0)
  const [itemLayout, setItemLayout] = React.useState([]);
  const [itemsProps, setItemsProps] = React.useState({})
  const chkMounted = useIsMounted();

  useEffect(() => {
    const { layout, mxCount, itemProps } = layoutState.getState();
    console.log(layout);
    setNewCounter(mxCount);
    setItemLayout(layout);
    setItemsProps(itemProps);
  }, [])

  useEffect(() => {
    layoutState.saveState(itemLayout, newCounter, itemsProps);
  }, [newCounter, itemLayout, itemsProps])

  const handleAddItem = React.useCallback((lItem, type) => {
    setNewCounter(c => c + 1);
    const newIdx = "n" + newCounter;
    setItemLayout(l => l.map(item => item.i !== DROPPING_ITEM ? item : {
      i: newIdx,
      x: lItem.x,
      y: lItem.y,
      w: lItem.w,
      h: lItem.h,
    }))
    setItemsProps((p) => ({
      ...p,
      [newIdx]: {
        type
      }
    }))

  }, [newCounter]);


  const handleRemoveItem = React.useCallback((el) => {
    setItemLayout(_.reject(itemLayout, { i: el.i }));
  }, [itemLayout]);

  const handleLayoutChange = React.useCallback((lout) => {
    /*eslint no-console: 0*/
    console.log(lout);
    setItemLayout(lout);
    props.onLayoutChange(lout);
  }, [props])


  const handleDropComponent = React.useCallback((lout, lItem, e) => {
    // Add a new item. It must have a unique key!		
    const type = e.dataTransfer.getData("text/plain");
    handleAddItem(lItem, type);
  }, [handleAddItem]);


  const handleClearAllItem = React.useCallback(() => {
    setItemLayout([]);
    layoutState.clearState();
  }, [])

  React.useImperativeHandle(ref, () => ({
    onClearAllItem() {
      handleClearAllItem();
    }
  }));
  console.log(itemLayout)

  return (
    <ReactGridLayout
      {...props}
      itemLayout={itemLayout}
      onDrop={handleDropComponent}
      useCSSTransforms={!!chkMounted}
      measureBeforeMount={false}
      isDroppable={true}
      droppingItem={{
        w: 12,
        h: 2,
        i: DROPPING_ITEM
      }
      }
      onLayoutChange={handleLayoutChange}
    >
      {
        itemLayout.map((item) =>
          (<div key={item.i} data-grid={item}>
            <PreviewComponent item={item} {...itemsProps[item.i]} >
            </PreviewComponent>
          </div>)
        )
      }
    </ReactGridLayout >
  )
})


PreviewContent.defaultProps = {
  className: "layout",
  cols: 12,
  rowHeight: 30,
  onLayoutChange: function () { },
};

export default PreviewContent;