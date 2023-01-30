import ReactDOM from "react-dom";
import { Fragment } from "react";
import { ModalProps } from "../../../interfaces/interfaces";

import "./Modal.scss";

const Backdrop = (props: any) => {
  return <div className="backdrop" onClick={props.onClose}></div>;
};

const ModalOverlay = (props: any) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement!
      )}
    </Fragment>
  );
};

export default Modal;
