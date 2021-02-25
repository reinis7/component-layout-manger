import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

import useIsMounted from 'hooks/useIsMounted'

const ReactGridLayout = WidthProvider(RGL);


export default function BasicLayout(props) {

	const [newCounter, setNewCounter] = React.useState(0)

	const [layout, setLayout] = React.useState([{
		x: 0,
		y: 0,
		w: 12,
		h: 2,
		i: "1"
	}]);

	const chkMounted = useIsMounted();

	const handleAddItem = React.useCallback((lItem) => {
		// Add a new item. It must have a unique key!
		console.log(lItem);
		console.log(`newCounter ${newCounter}`);
		setNewCounter((c) => {
			console.log('c', c)
			return c + 1
		});
		setLayout((layout) => layout.concat([{
			i: "n" + newCounter,
			x: lItem.x,
			y: lItem.y,
			w: lItem.w,
			h: lItem.h
		}]))
		console.log(newCounter);
		// Increment the counter to ensure key is always unique.
	}, [newCounter, setNewCounter]);

	const handleRemoveItem = React.useCallback((el) => {
		setLayout(_.reject(layout, { i: el.i }));
	}, [layout]);

	const handleLayoutChange = React.useCallback((lout) => {
		/*eslint no-console: 0*/
		console.log(lout);
		setLayout(lout);
		props.onLayoutChange(lout);
	}, [])


	const handleDropComponent = React.useCallback((lout, lItem, event) => {
		// Add a new item. It must have a unique key!
		console.log(lItem);
		handleAddItem(lItem);
	}, [handleAddItem]);

	console.log(layout);

	return (
		<>
			<ReactGridLayout
				layout={layout}
				onLayoutChange={handleLayoutChange}
				onDrop={handleDropComponent}
				useCSSTransforms={true}
				isDroppable={true}
				droppingItem={
					{ w: 12, h: 2, i: "dropping_item" }
				}
				{...props}
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
