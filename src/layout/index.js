import React from 'react';
import styled from 'styled-components';

import ToolPanel from 'components/sidebar/ToolPanel';
import PreviewContent from 'components/preview/PreviewContent';
import PreviewSource from 'components/preview/PreviewSource';

import { CONTENT_NAME, CODE_NAME } from 'helper/commonNames'

const CommonButton = styled.button`
    margin: 0 0.5rem;
`;
export default function MainLayout() {
	const prvRef = React.useRef(null);
	const deleteAllComponents = React.useCallback(() => {
		prvRef.current.onClearAllItem();
	}, [prvRef])
	const [tabStatus, setTabStatus] = React.useState(CONTENT_NAME);

	return (
		<>
			<MainWrapper>
				<ComponentsWrapper>
					<ToolPanel onDeleteButtonClicked={deleteAllComponents} />
				</ComponentsWrapper>
				<PreviewWrapper>
					<div>
						<CommonButton
							onClick={() => setTabStatus(CONTENT_NAME)}
							disabled={tabStatus === CONTENT_NAME}
						>
							Layout
            </CommonButton>
						<CommonButton
							onClick={() => setTabStatus(CODE_NAME)}
							disabled={tabStatus === CODE_NAME}
						>
							Code
  				</CommonButton>
					</div>
					<div>
						{tabStatus === CONTENT_NAME ?
							(<PreviewContent ref={prvRef} />) :
							<PreviewSource codes={prvRef.current.getContentCodes()}></PreviewSource>}
					</div>
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
