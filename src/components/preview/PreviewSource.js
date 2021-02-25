import React from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function PreviewSource({ codes }) {
	return (
		<SyntaxHighlighter
			language="html"
			showLineNumbers={true}
			style={a11yDark}>
			{codes}
		</SyntaxHighlighter>
	);
}
