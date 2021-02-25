import React, {
    useEffect,
    useState,
    useCallback
} from 'react'

import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";

import useIsMounted from 'hooks/useIsMounted'
import PreviewComponent from './PreviewComponent'
import { layoutState } from 'helper/layoutState'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function PreviewContent({ compactType, ...rest }) {

    const [arrangement, setArrangement] = useState([])
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
        const lay = layoutState.getState();
        if (lay && lay.arrange)
            setArrangement(lay.arrange);
    }, [])

    const onBreakpointChange = useCallback((b) => {
        setBreakpt(b);
    }, []);

    const onMouseDrop = useCallback(
        (layout, layoutItem, event) => {
            const appendedItem = {
                ...layoutItem,
                id: _.uniqueId('comp')
            }
            saveLayoutState((arrange) => [...arrange, appendedItem]);
        },
        [],
    )
    const saveLayoutState = useCallback((larrange) => {
        layoutState.saveState({ arrange: larrange });
        setArrangement(larrange);
    }, [])

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
            measureBeforeMount={false}
            // // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
            // // and set `measureBeforeMount={true}`.
            useCSSTransforms={chkMounted}
            compactType={compactType}
            preventCollision={!compactType}
            isDroppable={true}
        >
            {
                _.isArray(arrangement) && arrangement.map((item) => (
                    <div key={item.id}>
                        <PreviewComponent {...item} />
                    </div>
                ))
            }
        </ResponsiveReactGridLayout >
    )
}

PreviewContent.defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function () { },
    cols: { lg: 12, md: 12, sm: 6, xs: 2, xxs: 2 },
    compactType: "vertical"
};

