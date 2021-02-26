import React from 'react'
import _ from 'lodash'
import Modal from 'react-modal'
import styled from "styled-components"

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '30rem',
    minHeight: '15rem',
  }
};
const CommonButton = styled.button`
  padding: 0.25rem 0.75rem;
  margin: 0.5rem;
`

const ModalContentWrapperr = styled.div`
  padding: 0.25rem 0.75rem;
  margin: 0.5rem;
`


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#updateComponentPropsDlg');

export default function ComponentUpdateModal({ chkDlgVisible, item, itemProps, onCloseAction, ...rest }) {
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
    item && itemProps ? (<Modal
      isOpen={chkDlgVisible}
      onRequestClose={handleCloseModal}
      style={customModalStyles}
      contentLabel="Example Modal"
    >
      <h2> Edit Property - [{itemProps.type}-{item.i}]</h2 >
      <ModalContentWrapperr>
        {
          _.toPairs(newProps).map(([k, v]) =>
            <div key={k}>
              {k}: {k === 'content' ? (<input name={k} value={v} onChange={(e) => handleUpdateValue(k, e.target.value)} />) : (
                <textarea name={k} value={v} onChange={(e) => handleUpdateValue(k, e.target.value)} />
              )}
            </div>
          )
        }
      </ModalContentWrapperr>
      <div>
        <CommonButton onClick={handleSaveModal}>Save</CommonButton>
        <CommonButton onClick={handleCloseModal}>close</CommonButton>
      </div>
    </Modal >) : (
        <> </>
      )
  )
}
