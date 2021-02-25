import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export default function BasicLayout(props) {

	const [newCounter, setNewCounter] = React.useState(1)

	const [layout, setLayout] = React.useState([{
		x: 0,
		y: 0,
		w: 12,
		h: 2,
		i: "1"
	}]);

	const onAddItem = React.useCallback((el) => {
		// Add a new item. It must have a unique key!
		setLayout(layout.concat({
			i: "n" + newCounter,
			x: 0,
			y: Infinity, // puts it at the bottom
			w: 12,
			h: 2
		}))
		// Increment the counter to ensure key is always unique.
		setNewCounter(newCounter + 1);
	}, [newCounter, layout]);

	const onLayoutChange = React.useCallback((layout) => {
		props.onLayoutChange(layout);
	}, [])

	return (
		<>
			<button onClick={onAddItem}>Add Item</button>
			<ReactGridLayout
				layout={layout}
				onLayoutChange={onLayoutChange}
				{...props}
			>
				{
					_.map(layout, (item) =>
						(<div key={item.i}>
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
	items: 2,
	rowHeight: 30,
	onLayoutChange: function () { },
	cols: 12
};
