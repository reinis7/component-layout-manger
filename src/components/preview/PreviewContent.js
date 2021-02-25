import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

import useIsMounted from 'hooks/useIsMounted'

const ReactGridLayout = WidthProvider(RGL);
const DROPPING_ITEM = 'DROPPING_ITEM';

export default function BasicLayout(props) {

    const [newCounter, setNewCounter] = React.useState(0)
    const [layout, setLayout] = React.useState([]);
    const chkMounted = useIsMounted();

    const handleAddItem = React.useCallback((lItem) => {
        // Add a new item. It must have a unique key!
        setNewCounter(c => c + 1);

        setLayout((layout) => layout.filter(item => item.i !== DROPPING_ITEM).concat([{
            i: "n" + newCounter,
            x: lItem.x,
            y: lItem.y,
            w: lItem.w,
            h: lItem.h
        }]))
    }, [newCounter]);

    const handleRemoveItem = React.useCallback((el) => {
        setLayout(_.reject(layout, { i: el.i }));
    }, [layout]);

    const handleLayoutChange = React.useCallback((lout) => {
        /*eslint no-console: 0*/
        console.log(lout);
        setLayout(lout);
        props.onLayoutChange(lout);
    }, [props])


    const handleDropComponent = React.useCallback((lout, lItem, event) => {
        // Add a new item. It must have a unique key!		
        handleAddItem(lItem);
    }, [handleAddItem]);

    return (
        <>
            <ReactGridLayout
                {...props}
                layout={layout}
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
                    layout.map((item) =>
                        (<div key={item.i} data-grid={item}>
                            <span className="text">{item.i}</span>
                        </div>)
                    )
                }
            </ReactGridLayout>
        </>
    )
}


BasicLayout.defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function () { },
};
