import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'


export default function PreviewSetting({ item, itemProps, onCloseAction, ...rest }) {
  const [newProps, setNewProps] = React.useState({});

  //  filter the attribute
  React.useEffect(() => {
    const tProps = {}
    for (let k of ['url', 'label', 'content']) {
      console.log(`k-${k}`);
      if (_.has(itemProps, k)) {
        tProps[k] = itemProps[k]
      }
    }
    setNewProps(tProps);
  }, [itemProps])

  const handleCloseModal = React.useCallback(() => {
    onCloseAction();
  }, [onCloseAction])
  const handleSaveModal = React.useCallback(() => {
    onCloseAction({
      ...itemProps,
      ...newProps
    });
  }, [onCloseAction, newProps, itemProps])

  const handleUpdateValue = React.useCallback((key, value) => {
    if (newProps[key] === value) return;
    setNewProps({ ...newProps, [key]: value });
  }, [newProps])
  return (
    item && itemProps ? (
      <PreviewSettingWrapper>
        <PreviewSettingTitle>Edit Property</PreviewSettingTitle>
        <PreviewSettingSubtitle>[{itemProps.type}-{item.i}]</PreviewSettingSubtitle >
        <PreviewSettingContent>
          {
            _.toPairs(newProps).map(([k, v]) =>
              <PreviewSettingPropertySection key={k}>
                <strong>{_.startCase(_.toLower(k))}</strong>: {k === 'content' ? (<textarea name={k} value={v} onChange={(e) => handleUpdateValue(k, e.target.value)} />) :
                  (<PreviewSettingInput name={k} value={v} onChange={(e) => handleUpdateValue(k, e.target.value)} />)}
              </PreviewSettingPropertySection>
            )
          }
        </PreviewSettingContent>
        <PreviewSettingActioins>
          <CommonButton onClick={handleSaveModal}>Save</CommonButton>
          <CommonButton onClick={handleCloseModal}>close</CommonButton>
        </PreviewSettingActioins>
      </PreviewSettingWrapper>
    ) : (<PreviewSettingCenterSpan>
      <span>
        No item selected.
      </span>
    </PreviewSettingCenterSpan>)
  )
}


const PreviewSettingWrapper = styled.div`
`;
const PreviewSettingTitle = styled.h3`
  margin: 0.2rem 0;
`;
const PreviewSettingSubtitle = styled.h4`
  margin: 0.25em 0;
`;
const PreviewSettingContent = styled.div`
  margin: 0.25em 0;
`;
const PreviewSettingInput = styled.input`
  margin: 0.25em 0;
  height: 1.5rem;
`;

const PreviewSettingActioins = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const PreviewSettingPropertySection = styled.section`
  margin: 0.75em 0;
`;
const PreviewSettingCenterSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-weight: bold;
`

const CommonButton = styled.button`
padding: 0.25rem 0.75rem;
margin: 0.5rem;
`
