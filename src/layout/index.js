
import React from 'react';
import styled from 'styled-components';
import ToolPanel from 'components/sidebar/ToolPanel';
import PreviewContent from 'components/preview/PreviewContent';


export default function MainLayout() {
    const prvRef = React.useRef(null);
    const deleteAllComponents = React.useCallback(() => {
        prvRef.current.onClearAllItem();
    }, [prvRef])
    return (
        <>
            <MainWrapper>
                <ComponentsWrapper>
                    <ToolPanel onDeleteButtonClicked={deleteAllComponents} />
                </ComponentsWrapper>
                <PreviewWrapper>
                    <PreviewContent ref={prvRef} />
                </PreviewWrapper>
            </MainWrapper>
        </>
    )
}

const MainWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 20px;
    display: flex;

`

const ComponentsWrapper = styled.div`
    flex: 1 0 30%;
    width: 30%;
    max-width: 270px;
    min-width: 270px;
    height: 100vm;
    padding: 10px;
    background-color: #4caf50;
`

const PreviewWrapper = styled.div`
    flex: 1 0 70%;
    width: 70%;
    max-width: 70%;
    height: 100%;
    padding: 10px;
    background-color: #eeeeee;
    min-height: 20rem;

`
