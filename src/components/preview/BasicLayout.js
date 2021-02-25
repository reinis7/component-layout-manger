import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export default function BasicLayout(props) {


	const [layout, setLayout] = React.useState([{
		x: 0,
		y: 0,
		w: 12,
		h: 2,
		i: "1"
	}]);

	const generateDOM = React.useCallback(() => {
		return
	}, []);

	const onLayoutChange = React.useCallback((layout) => {
		props.onLayoutChange(layout);
	}, [])

	return (
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
	)
}


BasicLayout.defaultProps = {
	className: "layout",
	items: 2,
	rowHeight: 30,
	onLayoutChange: function () { },
	cols: 12
};
