import React from 'react'
import styled from 'styled-components';

import API from 'helper/api';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const SubmitButton = styled.button`

`

export default function PreviewSource({ codes }) {
	const handleSumbmitCodes = React.useCallback((codes) => {
		console.log(codes)
		API.post('/api/send_codes', { codes: codes }).then((item) => {
		});
	}, []);
	return (
		<div>
			<SubmitButton onClick={() => handleSumbmitCodes(codes)}> Sumbit</SubmitButton>
			<SyntaxHighlighter
				language="html"
				showLineNumbers={true}
				style={a11yDark}>
				{codes}
			</SyntaxHighlighter>
		</div>
	);
}
