import { FCC } from '@/helpers/FCC';
import { Fragment } from 'react';
import { Modal } from 'react-bootstrap';

interface IDialogProps {
  title: string;
  show: boolean;
  handleClose: () => void;
  centered?: boolean;
  size?: 'sm' | 'lg' | 'xl';
}

const Dialog: FCC<IDialogProps> = ({ title, show, handleClose, size, centered = true, children }) => {
  return (
    <div className="modal-dialog">
      <Modal size={size} show={show} onHide={handleClose} centered={centered} closeVariant="dark" as={Fragment}>
        <Modal.Header className="py-2" closeButton={true}>
          {title && <Modal.Title>{title || 'Modal Heading'}</Modal.Title>}
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
};

export default Dialog;
