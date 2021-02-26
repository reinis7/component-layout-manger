import React from "react"
import ReactDOMServer from "react-dom/server"
import _ from "lodash"
import RGL, { WidthProvider } from "react-grid-layout"
import styled from "styled-components"
import * as pretty from "pretty"

import useIsMounted from 'hooks/useIsMounted'
import { layoutState } from 'helper/layoutState'
import { IMAGE_LABEL, VIDEO_LABEL, LINK_LABEL, TEXT_LABEL, CUSTOM_HTML_LABEL, DROPPING_ITEM } from 'helper/commonNames'

import PreviewComponent from "./PreviewComponent"
import PreviewSetting from "./PreviewSetting"


const ReactGridLayout = WidthProvider(RGL)

const CloseButton = styled.span`
    position: absolute;
    right: 5px;
    top: -5px;
    font-weight: bold;
    cursor: pointer;
		z-index: 10
`

const PreviewContent = React.forwardRef((props, ref) => {

	const [newCounter, setNewCounter] = React.useState(0)
	const [itemLayout, setItemLayout] = React.useState([])
	const [itemsProps, setItemsProps] = React.useState({})
	const [chooseItem, setChooseItem] = React.useState(null)
	const [chkDlgVisible, setChkDlgVisible] = React.useState(false)

	const chkMounted = useIsMounted();

	React.useEffect(() => {
		const { layout, mxCount, itemProps } = layoutState.getState()
		setNewCounter(mxCount);
		setItemLayout(layout);
		setItemsProps(itemProps);
	}, [])

	React.useEffect(() => {
		layoutState.saveState(itemLayout, newCounter, itemsProps)
	}, [newCounter, itemLayout, itemsProps])

	const handleAddItem = React.useCallback((lItem, type) => {
		setNewCounter(c => c + 1)
		const newIdx = "n" + newCounter

		const getNewItem = (id, type) => {
			let [x, y, w, h] = [lItem.x, lItem.y, 12, 1]
			const props = {
				type
			}
			switch (type) {
				case IMAGE_LABEL:
					x = 3;
					h = 4;
					w = 6;
					props.url = 'https://www.w3schools.com/html/img_chania.jpg';
					break;
				case VIDEO_LABEL:
					x = 3;
					h = 4;
					w = 6;
					props.url = 'https://www.w3schools.com/html/mov_bbb.mp4';
					break;
				case LINK_LABEL:
					props.url = '#';
					props.label = 'Link';
					break;
				case TEXT_LABEL:
					props.content = 'Text';
					h = 2;
					break;
				case CUSTOM_HTML_LABEL:
					props.content = '<p>This is html</p>';
					break;
				default:
			}
			return [{
				i: id, x: x, y: y, w: w, h: h,
			}, props]
		}
		const [newItem, comProps] = getNewItem(newIdx, type);

		setItemLayout(l => l.map(item => item.i !== DROPPING_ITEM ? item : newItem))

		setItemsProps((p) => ({
			...p,
			[newIdx]: comProps
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

	const handleDoubleClick = React.useCallback((item) => {
		setChooseItem(item);
		setChkDlgVisible(true);
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
					<ReactGridLayout
						{...props}
						itemLayout={itemLayout}
					>
						{
							itemLayout.map((item) =>
							(<div key={item.i}>
								<PreviewComponent
									item={item}
									isSSR={true}
									{...itemsProps[item.i]}
								/>
							</div>)
							)
						}
					</ReactGridLayout >
				)
			)
		}
	}));
	const handleCloseAction = React.useCallback((newProps) => {
		if (newProps) {
			setItemsProps({
				...itemsProps,
				[chooseItem.i]: newProps
			})
		}
		setChkDlgVisible(false);
	}, [chooseItem, itemsProps])

	return (
		<PreviewWrapper>
			<PreviewSettingWrapper>
				<PreviewSetting	>
				</PreviewSetting>
			</PreviewSettingWrapper>
			<PreviewContentWrapper>
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
						(<div
							key={item.i}
							onDoubleClick={() => handleDoubleClick(item)}
							data-grid={item}>
							<PreviewComponent item={item} {...itemsProps[item.i]} >
							</PreviewComponent>
							<CloseButton
								className="remove"
								onClick={() => handleRemoveItem(item)}
							>
								x
          </CloseButton>
						</div>)
						)
					}
				</ReactGridLayout >
			</PreviewContentWrapper>
		</PreviewWrapper>
		// <ComponentUpdateModal
		// 	chkDlgVisible={chkDlgVisible}
		// 	item={chooseItem}
		// 	itemProps={chooseItem && chooseItem.i && itemsProps[chooseItem.i]}
		// 	onCloseAction={handleCloseAction}
		// ></ComponentUpdateModal>		
	)
});

PreviewContent.defaultProps = {
	className: "layout",
	cols: 12,
	rowHeight: 30,
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
    flex: 1 0 20%;
    width: 20%;
    max-width: 200px;
    padding: 10px;
    background-color: #B0B0B0;
`


export default PreviewContent;