import React, {
    useEffect,
    useState,
    useCallback
} from 'react'

import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";


import useIsMounted from 'hooks/useIsMounted'
import { layoutState } from 'helper/layoutState'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function PreviewContent({ compactType, ...rest }) {

    const [arrangement, setArrangement] = useState({})
    const [breakpt, setBreakpt] = useState();

    const [itemIdx, setItemIdx] = useState({
        image: 0,
        link: 0,
        video: 0,
        customlink: 0,
        text: 0
    });


    const chkMounted = useIsMounted();
    useEffect(() => {
        // const larrange = layoutState.getState();
        const larrange = generateLayout();
        console.log(larrange);
        setArrangement(larrange);
    }, [])

    const onBreakpointChange = useCallback((b) => {
        setBreakpt(b);
    }, []);
    const onMouseDrop = useCallback(
        (layout, layoutItem, event) => {
            const type = event.dataTransfer.getData("text/plain")
            console.log('layoutItem', type);
            console.log(itemIdx[type]);
            console.log(layoutItem);
            // // increase image count.
            // setItemIdx((layoutIt) => ({ ...layoutIt, [type]: layoutIt[type] + 1 }))
            // saveLayoutState(layout);
        },
        [],
    )
    const saveLayoutState = useCallback((layout) => {
        setArrangement(layout);
    }, [])
    const generateDOM = useCallback(() => {
        return _.map(arrangement, function (l, i) {
            return (
                <div key={i} className={l.static ? "static" : ""}>
                    {l.static ? (
                        <span
                            className="text"
                            title="This item is static and cannot be removed or resized."
                        >
                            Static - {i}
                        </span>
                    ) : (
                            <span className="text">{i}</span>
                        )}
                </div>
            );
        });
    }, [arrangement])

    const onLayoutChange = useCallback((layout) => {
        saveLayoutState(layout);
    }, []);


    return (
        chkMounted && <ResponsiveReactGridLayout
            {...rest}
            // layouts={this.state.layouts}
            onBreakpointChange={onBreakpointChange}
            onDrop={onMouseDrop}
            onLayoutChange={onLayoutChange}
            // // WidthProvider option
            // measureBeforeMount={false}
            // // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
            // // and set `measureBeforeMount={true}`.
            useCSSTransforms={chkMounted}
            compactType={compactType}
            preventCollision={!compactType}
            isDroppable={true}
        >
            {generateDOM()}
        </ResponsiveReactGridLayout >
    )
}

PreviewContent.defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function () { },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    compactType: "vertical"
};

function generateLayout() {
    return _.map(_.range(0, 10), function (item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: Math.round(Math.random() * 5) * 2,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            i: i.toString(),
            static: Math.random() < 0.05
        };
    });
}

