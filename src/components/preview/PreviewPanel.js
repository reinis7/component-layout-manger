import React from 'react'
import styled from 'styled-components';

import PreviewContent from 'components/preview/PreviewContent'
import { layoutState } from 'helper/layoutState'

const PreviewHeaderWrapper = styled.div`
    height: 2rem;
    border-bottom: grey 1px solid;
`;
const PreviewContentWrapper = styled.div`  
    min-height: 5rem ;
`;
const CommonButton = styled.button`
    height: 2rem;
    margin: 0.25rem;
    width: 10rem;  
`;
export default function PreviewPanel() {
    const handleClearBtnClicked = React.useCallback(() => {
        layoutState.clearState()
    }, []);
    return (
        <>
            <PreviewHeaderWrapper>
                <CommonButton
                    onClick={handleClearBtnClicked}
                >
                    Clear ALL
                </CommonButton>

            </PreviewHeaderWrapper>
            <PreviewContentWrapper>
                <PreviewContent />
            </PreviewContentWrapper>
        </>
    )
}
