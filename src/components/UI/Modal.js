import ReactDom from 'react-dom';
import { Fragment } from 'react';
import styles from './Modal.module.css';

const BackDrop = (props) => {
    const menuBackdropClass = `${styles.backdrop} ${
        !props.menuIsEnabled
            ? styles['cut-backdrop-display']
            : styles['add-backdrop-display']
    }`;

    return <div className={menuBackdropClass} onClick={props.onCloseMenu}></div>;
};

const ModalOverlay = (props) => {
    const menuModalClass = `${styles.menu} ${
        props.menuIsEnabled ? styles['show-menu'] : ''
    }`;

    return <div className={menuModalClass}>{props.children}</div>;
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDom.createPortal(
                <BackDrop
                    menuIsEnabled={props.menuIsEnabled}
                    onCloseMenu={props.onShowMenu}
                />,
                portalElement
            )}
            {ReactDom.createPortal(
                <ModalOverlay menuIsEnabled={props.menuIsEnabled}>
                    {props.children}
                </ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default Modal;
