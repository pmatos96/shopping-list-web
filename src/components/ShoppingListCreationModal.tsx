import React, { useState } from "react";
import { Form, Header, Modal, Button, Message } from "semantic-ui-react";
import FieldUtils from "../utils/fieldUtils";

type ShoppingListCreationModal = {
    createShoppingList: Function,
    open: boolean,
    setOpen: Function
}

const ShoppingListCreationModal = ({ createShoppingList, open, setOpen }: ShoppingListCreationModal) => {

    const [listName, setListName] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();

    const handleConfirmButton = () => {

        const fieldValidation = FieldUtils.validateRequiredFields([
            { name: "listName", value: listName }
        ]);

        if (fieldValidation && !fieldValidation.valid) {
            setErrorMessage('Preencha os campos obrigatórios!');
        }
        else {
            setErrorMessage('');
            createShoppingList(listName).then(() => {
                setOpen(false);
            })
        }
    }

    const handleCancelButton = () => {
        setListName('');
        setOpen(false);
    }

    return (
        <Modal
            open={open}
        >
            <Header content="Nova lista de compras" />
            <Modal.Content>
                <Form>
                    <Form.Field required>
                        <label>Nome</label>
                        <input
                            value={listName}
                            onChange={(e) => { setListName(e.target.value) }}
                            placeholder="Nome da lista"
                        />
                    </Form.Field>
                </Form>
                {errorMessage && <Message
                    error
                    header='Erro no preenchimento'
                    content={errorMessage}
                />}
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={handleCancelButton}>Cancelar</Button>
                <Button onClick={handleConfirmButton} positive>Confirmar</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ShoppingListCreationModal;