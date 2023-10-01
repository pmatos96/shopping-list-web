import React from "react";
import { Header, Modal, Button } from "semantic-ui-react";

type GenericConfirmModal = {
    onConfirm: Function,
    open: boolean,
    setOpen: Function,
    title: string,
    message: string,
    confirmLabel?: string,
    cancelLabel?: string,
    auxiliarData?: any
}

const GenericConfirmModal = ({
    onConfirm,
    open,
    setOpen,
    title,
    message,
    confirmLabel,
    cancelLabel,
    auxiliarData
}: GenericConfirmModal) => {

    const handleConfirmButton = () => {

        (auxiliarData ? onConfirm(auxiliarData) : onConfirm()).then(() => {
            setOpen(false);
        })
    }

    const handleCancelButton = () => {
        setOpen(false);
    }

    return (
        <Modal open={open}>
            <Header content={title} />
            <Modal.Content>
                <p>{message}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={handleCancelButton}>{cancelLabel || "Cancelar"}</Button>
                <Button onClick={handleConfirmButton} positive>{confirmLabel || "Confirmar"}</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default GenericConfirmModal;