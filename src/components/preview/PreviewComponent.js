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

	let url, label, content;

	let render_comp = '<></>'
	switch (type) {
		case VIDEO_LABEL:
			url = 'https://www.w3schools.com/html/mov_bbb.mp4';
			render_comp = isSSR ? (
				<video width="100%" height="100%" controls>
					<source src={url} type="video/mp4" />
									Your browser does not support the video tag.
				</video>
			) : (
					<ReactPlayer
						width="100%"
						height="100%"
						controls
						ref={videoRef}
						url={url}
					>
					</ReactPlayer>
				)
			break;

		case LINK_LABEL:
			url = 'https://www.w3schools.com/';
			label = 'W3School';
			render_comp = <a href={url}> {label}</a>
			break;

		case TEXT_LABEL:
			label = 'W3School';
			render_comp = <span> W3School</span>
			break;

		case IMAGE_LABEL:
			url = 'https://www.w3schools.com/html/img_chania.jpg';
			render_comp = <img src={url} alt="Flowers in Chania" width="100%" height="100%" />
			break;

		case CUSTOM_HTML_LABEL:
			content = '<p>This is html parse Option</p>';
			render_comp = parse(content, htmlParseOptions);
			break;
		default:
			render_comp = <span> New Item</span>
			break;
	}
	return render_comp;
}
PreviewComponent.defaultProps = {
	type: "",
	isSSR: false,
};