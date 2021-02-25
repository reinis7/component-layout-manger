import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import styled from "styled-components";

import useIsMounted from 'hooks/useIsMounted'
import { layoutState } from 'helper/layoutState';
import { IMAGE_LABEL, VIDEO_LABEL, LINK_LABEL, TEXT_LABEL, CUSTOM_HTML_LABEL, DROPPING_ITEM } from 'helper/commonNames';

import PreviewComponent from "./PreviewComponent";

const ReactGridLayout = WidthProvider(RGL);

const DeleteButton = styled.span`
    position: absolute;
    right: 5px;
    top: -5px;
    font-weight: bold;
    cursor: pointer;
`

const PreviewContent = React.forwardRef((props, ref) => {

	const [newCounter, setNewCounter] = React.useState(0)
	const [itemLayout, setItemLayout] = React.useState([]);
	const [itemsProps, setItemsProps] = React.useState({})
	const chkMounted = useIsMounted();

	React.useEffect(() => {
		const { layout, mxCount, itemProps } = layoutState.getState();
		setNewCounter(mxCount);
		setItemLayout(layout);
		setItemsProps(itemProps);
	}, [])

	React.useEffect(() => {
		layoutState.saveState(itemLayout, newCounter, itemsProps);
	}, [newCounter, itemLayout, itemsProps])

	const handleAddItem = React.useCallback((lItem, type) => {
		setNewCounter(c => c + 1);
		const newIdx = "n" + newCounter;

		const getNewItem = (id, type) => {
			let [x, y, w, h] = [lItem.x, lItem.y, 12, 1]
			switch (type) {
				case IMAGE_LABEL:
				case VIDEO_LABEL:
					x = 3;
					h = 4;
					w = 6;
					break;
				case LINK_LABEL:
				case TEXT_LABEL:
				case CUSTOM_HTML_LABEL:
				default:
					break;
			}
			return {
				i: id,
				x: x,
				y: y,
				w: w,
				h: h,
			}
		}
		setItemLayout(l => l.map(item => item.i !== DROPPING_ITEM ? item : getNewItem(newIdx, type)))

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
		},
		getContentCodes() {
			return '<div></div>'
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
				h: 1,
				i: DROPPING_ITEM
			}}
			onLayoutChange={handleLayoutChange}
		>
			{
				itemLayout.map((item) =>
				(<div key={item.i} data-grid={item}>
					<PreviewComponent item={item} {...itemsProps[item.i]} >
					</PreviewComponent>
					<DeleteButton
						className="remove"
						onClick={() => handleRemoveItem(item)}
					>
						x
          </DeleteButton>
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