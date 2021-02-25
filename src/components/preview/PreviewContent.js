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
import { getElementError } from '@testing-library/react';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function PreviewContent({ compactType, ...rest }) {

    const [layouts, setLayouts] = useState({
        lg: []
    });
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
            setLayouts({ lg: lay.arrange });
    }, [])

    const onBreakpointChange = useCallback((b) => {
        setBreakpt(b);
    }, []);

    const onMouseDrop = useCallback(
        (layout, layoutItem, event) => {
            console.log('-------onMouseDrop--------');
            saveLayoutState(layout);
        },
        [],

    )
    const saveLayoutState = useCallback((lgLayout) => {
        const checkAppendedStatus = (l) => {
            return l.find(item => item.i === '__dropping-elem__' || item.i === 'null')
        }
        const newState = lgLayout.map(i => i);
        const item = checkAppendedStatus(newState);
        if (item) {
            item.i = (newState.length + 1).toString();
        }

        setLayouts({ lg: newState });
        layoutState.saveState({ arrange: newState });
    }, [])

    const onLayoutChange = useCallback((layout) => {
        console.log('----- onLayoutChange ------');
        saveLayoutState(layout);
    }, []);


    return (
        <ResponsiveReactGridLayout
            {...rest}
            layouts={layouts}
            onBreakpointChange={onBreakpointChange}
            onDrop={onMouseDrop}
            onLayoutChange={onLayoutChange}
            // // WidthProvider option
            measureBeforeMount={false}
            // // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
            // // and set `measureBeforeMount={true}`.
            useCSSTransforms={!!chkMounted}
            compactType={compactType}
            preventCollision={!compactType}
            isDroppable={true}
        >
            {
                _.isArray(layouts.lg) && layouts.lg.map((item) => (
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

