import React from 'react'
import PreviewContent from 'components/preview/PreviewContent'
import styled from 'styled-components';

const PreviewHeaderWrapper = styled.div`
    height: 2rem;
    border-bottom: grey 1px solid;
`;
const PreviewContentWrapper = styled.div`    
`;
export default function PreviewPanel() {
    return (
        <>
            <PreviewHeaderWrapper>
            </PreviewHeaderWrapper>
            <PreviewContentWrapper>
                <PreviewContent />
            </PreviewContentWrapper>
        </>
    )
}
