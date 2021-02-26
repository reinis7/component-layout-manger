import React, { useEffect } from 'react'
import Modal from 'react-modal';


const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#updateComponentPropsDlg');

export default function PreviewUpdateComponent({ item, openModal, ...rest }) {
  const [chkModalOpen, setModalOpen] = React.useState(openModal);

  const subtitle = React.useRef(null);

  const handleAfterOpenModal = React.useCallback(() => {
    subtitle.style.color = '#f00';
  }, [])

  const handleCloseModal = React.useCallback(() => {
    setModalOpen(false);
  }, [])
  // 
  useEffect(() => {
    if (!chkModalOpen) {
      console.log('closeModal');
    }
  }, [chkModalOpen])

  return (
    <Modal
      isOpen={chkModalOpen}
      onAfterOpen={handleAfterOpenModal}
      onRequestClose={handleCloseModal}
      style={customModalStyles}
      contentLabel="Example Modal"
    >
      <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
      <button onClick={handleCloseModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  )
}
