import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import useImageRatio from 'hooks/useImageRatio'
import useVideoRatio from 'hooks/useVideoRatio'
import { IMAGE_LABEL, VIDEO_LABEL, ATTR_PARAMS } from 'helper/commonNames'




export default function PreviewSetting({ item, itemProps, onSave, onClose, screenWidth, ...rest }) {
  const [newProps, setNewProps] = React.useState({});

  const calcImageRatio = useImageRatio();
  const calcVideoRatio = useVideoRatio();
  //  filter the attribute
  React.useEffect(() => {
    const tProps = {}
    for (let k of ATTR_PARAMS) {
      if (_.has(itemProps, k)) {
        tProps[k] = itemProps[k]
      }
    }
    setNewProps(tProps);
  }, [itemProps])

  const handleCancelModal = React.useCallback(() => {
    setNewProps(itemProps);
  }, [itemProps])


  const chkUpdateProps = React.useCallback(() => {
    for (let k of ATTR_PARAMS) {
      if (_.has(itemProps, k) && newProps[k] !== itemProps[k]) {
        return true;
      }
    }
    return false;
  }, [itemProps, newProps]);

  const handleSaveModal = React.useCallback(() => {

    // props check
    if (!chkUpdateProps()) return;

    if (screenWidth && itemProps.url !== newProps.url) {

      const callback = (h) => {
        const newItem = _.assign({}, item, { h });
        onSave({
          ...itemProps,
          ...newProps
        }, newItem);
      }
      if (itemProps.type === IMAGE_LABEL) {
        calcImageRatio({
          url: newProps.url,
          w: screenWidth * item.w / 12
        }, callback)
        return;
      } else if (itemProps.type === VIDEO_LABEL) {
        calcVideoRatio({
          url: newProps.url,
          w: screenWidth * item.w / 12
        }, callback, (e) => console.log(e))
        return;
      }
    }
    onSave({
      ...itemProps,
      ...newProps
    });
  }, [onSave, newProps, item, itemProps, screenWidth, calcImageRatio, chkUpdateProps, calcVideoRatio])

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
          <CommonButton onClick={() => { handleSaveModal(); onClose(); }}>Save</CommonButton>
          <CommonButton onClick={handleCancelModal}>restore</CommonButton>
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
