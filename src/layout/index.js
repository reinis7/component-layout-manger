
import React from 'react';
import styled from 'styled-components';
import ToolPanel from 'components/sidebar/ToolPanel';
import PreviewPanel from 'components/preview/PreviewPanel';


export default function MainLayout() {
    return (
        <>
            <MainWrapper>
                <ComponentsWrapper>
                    <ToolPanel />
                </ComponentsWrapper>
                <PreviewWrapper>
                    <PreviewPanel />
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
