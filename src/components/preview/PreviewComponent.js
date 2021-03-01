import React from 'react'
import { IMAGE_LABEL, VIDEO_LABEL, LINK_LABEL, TEXT_LABEL, CUSTOM_HTML_LABEL } from 'helper/commonNames'

import parse from "html-react-parser";
import styled from 'styled-components';

const VideoWrapper = styled.div`
	display: grid;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
`

export default function PreviewComponent({ type, isSSR, onContentHeight, ...rest }) {


	// const chldRef = React.useRef(null);
	const htmlParseOptions = React.useMemo(() => ({
		replace: (domNode) => {
			if (domNode.attribs && domNode.attribs.class === "remove") {
				return <></>;
			}
		}
	}), []);

	const calcRef = React.useCallback((ref) => {
		if (ref) {
			onContentHeight(ref.offsetHeight)
		}
	}, [onContentHeight])

	let render_comp = '<></>'
	let parseHtml = '<></>'
	switch (type) {
		case VIDEO_LABEL:
			render_comp =
				<>
					<VideoClip url={rest.url}></VideoClip>
					{/* {!isSSR && (<VideoWrapper />)} */}
				</>
			break;
		case LINK_LABEL:
			render_comp = <a ref={(e) => calcRef(e)} href={rest.url}> {rest.label}</a>
			break;
		case TEXT_LABEL:
			render_comp = <p ref={(e) => calcRef(e)}> {rest.content}</p>
			break;

		case IMAGE_LABEL:
			render_comp = <div className="img-wrap"><img src={rest.url} alt="IMAGE NOT FOUND" /></div>
			break;

		case CUSTOM_HTML_LABEL:
			parseHtml = parse(rest.content, htmlParseOptions)
			render_comp = <div ref={(e) => calcRef(e)}>{parseHtml}</div>
			break;

		default:
			render_comp = <span> New Item</span>
	}
	return render_comp;
}
function VideoClip({ url }) {
	const videoRef = React.useRef();
	const previousUrl = React.useRef(url);

	React.useEffect(() => {
		if (previousUrl.current !== url) {
			console.log('url' + url);
			console.log(videoRef);
			videoRef?.current.load();
		}
	}, [url]);

	return (
		<video ref={videoRef} width="100%" height="100%" key={url} controls >
			<source src={url} />
			Your browser does not support the video tag.
		</video>
	);
}
PreviewComponent.defaultProps = {
	type: "",
	isSSR: false,
};
