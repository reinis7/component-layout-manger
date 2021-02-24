
import React from 'react';
import styled from 'styled-components';
import ToolPanel from 'components/sidebar/ToolPanel';
import PreviewPanel from 'components/preview/PreviewPanel';

const MainHeader = styled.header`
    background-color: #4caf50;
    height: 3rem;
    `;
const MainFooter = styled.footer`
    background-color: #4caf50;
    height: 3rem;
`;

const MainBody = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const SideBar = styled.div`
    flex-basis: 20rem;
    flex-grow: 1;
    border-right: grey 1px solid;

`;

const MainPanel = styled.div`
    flex-basis: 0;
    flex-grow: 999;
    min-width: calc(50% - 1rem);
`;


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
    max-width: 30%;
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
`
