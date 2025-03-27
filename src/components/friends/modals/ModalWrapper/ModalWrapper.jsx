import { useEffect, useRef } from 'react';
import './ModalWrapper.css';
import { styled } from 'styled-components';
const ModalWrapper = ({ titleId, titleText, onClose, children }) => {
  const backdropRef = useRef(null);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [onClose]);

  const handelBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      ref={backdropRef}
      onClick={handelBackdropClick}
    >
      <ModalWindow
        className="modal-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="modal-header">
          <h2 id={titleId}>{titleText}</h2>
          <button
            className="modal-close"
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </ModalWindow>
    </div>
  );
};

const ModalWindow = styled.div`
  background-color: ${({ theme }) => theme.mainBg};
`;
export default ModalWrapper;
