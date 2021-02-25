import React from 'react'
import styled from 'styled-components';

import PreviewContent from 'components/preview/PreviewContent'

const PreviewHeaderWrapper = styled.div`
    height: 2rem;
    border-bottom: grey 1px solid;
`;
const PreviewContentWrapper = styled.div`  
    min-height: 5rem ;
`;

export default function PreviewPanel(props) {
    return (
        <PreviewContentWrapper>
        </PreviewContentWrapper>
    )
}
