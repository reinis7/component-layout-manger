import React from "react"
import ReactDOMServer from "react-dom/server"
import _ from "lodash"
import RGL, { WidthProvider } from "react-grid-layout"
import styled from "styled-components"
import * as pretty from "pretty"

import { layoutState } from 'helper/layoutState'
import { getLayoutHeight } from 'helper/utils'
import { IMAGE_LABEL, VIDEO_LABEL, LINK_LABEL, TEXT_LABEL, CUSTOM_HTML_LABEL, DROPPING_ITEM } from 'helper/commonNames'
import useIsMounted from 'hooks/useIsMounted'
import useImageRatio from 'hooks/useImageRatio'
import useVideoRatio from 'hooks/useVideoRatio'

import PreviewComponent from "./PreviewComponent"
import PreviewSetting from "./PreviewSetting"


const ReactGridLayout = WidthProvider(RGL)


const PreviewContent = React.forwardRef((props, ref) => {

	const [newCounter, setNewCounter] = React.useState(0)
	const [chkSaveState, setChkSaveState] = React.useState(false)
	const [itemLayout, setItemLayout] = React.useState([])
	const [itemsProps, setItemsProps] = React.useState({})
	const [chooseItem, setChooseItem] = React.useState(null)
	const [droppingItem, setDroppingItem] = React.useState({ i: DROPPING_ITEM, w: 12, h: 1 })

	const GridWidth = props.width;
	const chkMounted = useIsMounted();
	const calcImageRatio = useImageRatio();
	const calcVideoRatio = useVideoRatio();


	React.useEffect(() => {
		const feach_data = async () => {
			const data = await layoutState.getState();
			const { layout, mxCount, itemProps } = data;
			setNewCounter(mxCount);
			setItemLayout(layout);
			setItemsProps(itemProps);
		}
		feach_data();
	}, [])

	const onDragStop = React.useCallback(() => {
		setChkSaveState(true);
	}, [])

	React.useEffect(() => {
		if (chkSaveState) {
			layoutState.saveState(itemLayout, newCounter, itemsProps);
			setChkSaveState(false);
		}
	}, [newCounter, itemLayout, itemsProps, chkSaveState])


	const callbackLayoutItems = React.useCallback((h, newItem) => {
		if (h !== newItem.h) {
			setItemLayout(l => l.map(item => item.i !== newItem.i ? item : {
				...newItem, h
			}))
		}
	}, [setItemLayout]);

	const getNewItem = React.useCallback((type, lItem) => {
		const newItem = Object.assign({}, lItem);
		const props = {
			type
		}
		switch (type) {
			case IMAGE_LABEL:
				newItem.x = 0;
				newItem.h = 4;
				newItem.w = 12;
				props.url = 'https://www.w3schools.com/html/img_chania.jpg';
				calcImageRatio({
					url: props.url,
					w: GridWidth * newItem.w / 12,
				}, (h) => { callbackLayoutItems(h, newItem) }
					, (e) => {
						console.log(e);
					})
				break;
			case VIDEO_LABEL:
				newItem.x = 3;
				newItem.h = 4;
				newItem.w = 12;
				props.url = 'https://www.w3schools.com/html/mov_bbb.mp4';
				calcVideoRatio({
					url: props.url,
					w: GridWidth * newItem.w / 12,
				}, (h) => { callbackLayoutItems(h, newItem) }
					, (e) => {
						console.log(e);
					})

				break;
			case LINK_LABEL:
				props.url = '#';
				props.label = 'Link';
				break;
			case TEXT_LABEL:
				props.content = 'Text';
				newItem.h = 1;
				break;
			case CUSTOM_HTML_LABEL:
				props.content = '<p>This is html</p>';
				break;
			default:
		}
		return [newItem, props]
	}, [GridWidth, calcImageRatio, callbackLayoutItems, calcVideoRatio]);

	const getUpdatedLayout = React.useCallback((items, newItem) => {
		return items.map(item => item.i === newItem.i ? newItem : item);
	}, [])

	const handleRemoveItem = React.useCallback((el) => {
		setItemLayout(_.reject(itemLayout, { i: el.i }));
		const newProps = Object.assign({}, itemsProps)
		delete newProps[el.i];
		setItemsProps(newProps);
		setChkSaveState(true);
	}, [itemLayout, itemsProps]);

	const handleLayoutChange = React.useCallback((lout) => {
		/*eslint no-console: 0*/
		if (lout.length === itemLayout.length) {
			// update for 
			setItemLayout(lout);
		}
		props.onLayoutChange(lout);
	}, [props, itemLayout])


	const handleDropComponent = React.useCallback((lout, lItem, e) => {
		// Add a new item. It must have a unique key!		
		const type = e.dataTransfer.getData("text/plain");
		const [newItem, comProps] = getNewItem(type, lItem);
		const newLayouts = getUpdatedLayout(lout, newItem);

		setItemsProps(p => ({ ...p, [lItem.i]: comProps }))
		setItemLayout(newLayouts);
		setNewCounter(c => c + 1)
		setChkSaveState(true);
	}, [getNewItem, getUpdatedLayout]);

	React.useEffect(() => {
		setDroppingItem({ i: "n" + newCounter, w: 12, h: 1 })
	}, [newCounter])


	const handleClearAllItem = React.useCallback(() => {
		layoutState.clearState().then((item) => console.log(item));
		setItemLayout([]);
		setItemsProps({});
	}, [])

	const handleContentHeight = React.useCallback((height, item) => {
		const newH = getLayoutHeight(height);
		if (item.h < newH) {
			setItemLayout(getUpdatedLayout(itemLayout, {
				...item,
				h: newH
			}))
		}
	}, [getUpdatedLayout, itemLayout]);
	const handleItemClick = React.useCallback((item) => {
		setChooseItem(item);
	}, [])

	React.useImperativeHandle(ref, () => ({
		onClearAllItem() {
			handleClearAllItem();
		},
		getSelectedItem() {
			return chooseItem;
		},
		getContentCodes() {
			return pretty(
				ReactDOMServer.renderToStaticMarkup(
					itemLayout.map(item => item).sort((a, b) => (a.y - b.y)).map((item) => (
						<div key={item.i}>
							<PreviewComponent
								item={item}
								isSSR={true}
								{...itemsProps[item.i]}
							/>
						</div>)
					)
				)
			)
		}
	}));
	const handleCloseAction = React.useCallback((newProps, newItem) => {
		if (newProps || newItem) {
			if (newProps) {
				setItemsProps({
					...itemsProps,
					[chooseItem.i]: newProps
				})
			}
			if (newItem) {
				setItemLayout(its => its.map(it => it.i !== newItem.i ? it : newItem))
			}
			setChkSaveState(true);
		}
	}, [chooseItem, itemsProps,])

	return (
		<PreviewWrapper>
			<PreviewContentWrapper>
				<ReactGridLayout
					{...props}
					layout={itemLayout}
					onDrop={handleDropComponent}
					useCSSTransforms={!!chkMounted}
					measureBeforeMount={false}
					isDroppable={true}
					droppingItem={droppingItem}
					onLayoutChange={handleLayoutChange}
					onDragStop={onDragStop}
				>
					{
						itemLayout.map((item) =>
						(<div
							key={item.i}
							onClick={() => handleItemClick(item)}
							data-grid={item}
							data-id={item.i}
						>
							<CloseButton
								className="remove"
								onClick={() => handleRemoveItem(item)}
							>
								x
							</CloseButton>
							<PreviewComponent
								item={item}
								{...itemsProps[item.i]}
								onContentHeight={(h) => handleContentHeight(h, item)}
							>
							</PreviewComponent>
						</div>)
						)
					}
				</ReactGridLayout >
			</PreviewContentWrapper>
			<PreviewSettingWrapper>
				<PreviewSetting
					item={chooseItem}
					itemProps={chooseItem && chooseItem.i && itemsProps[chooseItem.i]}
					onSave={handleCloseAction}
					screenWidth={GridWidth}
				>
				</PreviewSetting>
			</PreviewSettingWrapper>
		</PreviewWrapper>
	)
});

PreviewContent.defaultProps = {
	className: "layout",
	cols: 12,
	rowHeight: 30,
	width: 840,
	onLayoutChange: function () { },
};

const PreviewWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 20px;
    display: flex;
`


const PreviewContentWrapper = styled.div`
    flex: 1 0 75%;
    width: 75%;
    max-width: 75%;
    height: 100%;
    padding: 10px;
    background-color: #eeeeee;
    min-height: 20rem;

`
const PreviewSettingWrapper = styled.div`
    flex: 1 0 25%;
    width: 20%;
    max-width: 200px;
    padding: 10px;
    background-color: #B0B0B0;
`


const CloseButton = styled.div`
    position: absolute;
    right: 5px;
    top: -5px;
    font-weight: bold;
    cursor: pointer;
		z-index: 101
`
export default PreviewContent;