import React, { useEffect } from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

import useIsMounted from 'hooks/useIsMounted'
import { layoutState } from 'helper/layoutState';


const ReactGridLayout = WidthProvider(RGL);
const DROPPING_ITEM = 'DROPPING_ITEM';

const PreviewContent = React.forwardRef((props, ref) => {

  const [newCounter, setNewCounter] = React.useState(0)
  const [itemLayout, setItemLayout] = React.useState([]);
  const chkMounted = useIsMounted();

  useEffect(() => {
    const { layout, mxCount } = layoutState.getState();
    setNewCounter(mxCount);
    setItemLayout(layout);
  }, [])

  useEffect(() => {
    layoutState.saveState(itemLayout, newCounter);
  }, [newCounter, itemLayout])

  const handleAddItem = React.useCallback((lItem) => {
    // Add a new item. It must have a unique key!
    setNewCounter(c => c + 1);
    setItemLayout(l => l.map(item => item.i !== DROPPING_ITEM ? item : {
      i: "n" + newCounter,
      x: lItem.x,
      y: lItem.y,
      w: lItem.w,
      h: lItem.h
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


  const handleDropComponent = React.useCallback((lout, lItem, event) => {
    // Add a new item. It must have a unique key!		
    handleAddItem(lItem);
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
            <span className="text">{item.i}</span>
          </div>)
        )
      }
    </ReactGridLayout>
  )
})


PreviewContent.defaultProps = {
  className: "itemLayout",
  cols: 12,
  rowHeight: 30,
  onLayoutChange: function () { },
  onClearAllItem: function () { },
};

export default PreviewContent;