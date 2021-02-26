import React from 'react'
import { IMAGE_LABEL, VIDEO_LABEL, LINK_LABEL, TEXT_LABEL, CUSTOM_HTML_LABEL } from 'helper/commonNames'
import ReactPlayer from "react-player"

import parse from "html-react-parser";

export default function PreviewComponent({ type, isSSR, ...rest }) {

	const videoRef = React.useRef(null);
	const htmlParseOptions = React.useMemo(() => ({
		replace: (domNode) => {
			if (domNode.attribs && domNode.attribs.class === "remove") {
				return <></>;
			}
		}
	}), []);

	React.useEffect(() => {
		if (type === VIDEO_LABEL) {
			console.log('VIDEO_LABEL');
			// videoRef.current.actions.toggleFullscreen = () => {
			// 	console.log('prevent full screen video');
			// }
		}
	}, [videoRef, type])

	let render_comp = '<></>'
	switch (type) {
		case VIDEO_LABEL:
			render_comp = isSSR ? (
				<video width="100%" height="100%" controls>
					<source src={rest.url} type="video/mp4" />
									Your browser does not support the video tag.
				</video>
			) : (
					<ReactPlayer
						width="100%"
						height="100%"
						controls
						ref={videoRef}
						url={rest.url}
					>
					</ReactPlayer>
				)
			break;
		case LINK_LABEL:
			render_comp = <a href={rest.url}> {rest.label}</a>
			break;
		case TEXT_LABEL:
			render_comp = <p> {rest.content}</p>
			break;

		case IMAGE_LABEL:
			render_comp = <img src={rest.url} alt="IMAGE NOT FOUND" width="100%" height="100%" />
			break;

		case CUSTOM_HTML_LABEL:
			render_comp = parse(rest.content, htmlParseOptions);
			break;

		default:
			render_comp = <span> New Item</span>
	}
	return render_comp;
}
PreviewComponent.defaultProps = {
	type: "",
	isSSR: false,
};