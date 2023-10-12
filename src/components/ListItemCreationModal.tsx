import React, { ChangeEvent, useEffect, useState } from "react";
import { Form, Header, Modal, Button, Message, Dropdown, DropdownProps } from "semantic-ui-react";
import FieldUtils from "../utils/fieldUtils";
import { Product } from "../types/shoppingListTypes";
import { useLoader } from "./LoaderContext";
import MainApi from "../apis/mainApi";

type ListItemCreationModalInput = {
    createListItem: Function,
    open: boolean,
    setOpen: Function,
    listId: number
}

const ListItemCreationModal = ({ createListItem, open, setOpen, listId }: ListItemCreationModalInput) => {

    const [product, setProduct] = useState<Product>();
    const [amount, setAmount] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [productOptions, setProductOptions] = useState<Product[]>([]);

    const { showLoader, hideLoader } = useLoader();

    const handleConfirmButton = () => {

        const fieldValidation = FieldUtils.validateRequiredFields([
            { name: "product", value: product },
            { name: "amount", value: amount }
        ]);

        if (fieldValidation && !fieldValidation.valid) {
            setErrorMessage('Preencha os campos obrigatórios!');
        }
        else {
            setErrorMessage('');
            createListItem(product, amount, listId).then(() => {
                setOpen(false);
            })
        }
    }

    const handleCancelButton = () => {
        setProduct(undefined);
        setAmount(1);
        setOpen(false);
    }

    const handleProductSelection = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        const selectedProduct = data.value;
        setProduct(productOptions.find(option => option.id == Number(selectedProduct)));
    }

    const setUpdatedProductOptions = () => {
        showLoader();
        MainApi.getProducts()
            .then(setProductOptions)
            .then(hideLoader)
    }

    useEffect(() => {
        setUpdatedProductOptions();
    }, [])

    return (
        <Modal
            open={open}
        >
            <Header content="Novo item da lista" />
            <Modal.Content>
                <Form>
                    <Form.Field required>
                        <label>Produto</label>
                        <Dropdown
                            placeholder="Selecione o produto"
                            fluid
                            search
                            selection
                            onChange={handleProductSelection}
                            options={(productOptions.map((option): { key: number, value: number, text: string } => {
                                return {
                                    key: Number(option.id),
                                    value: Number(option.id),
                                    text: `${option.name} / ${option.section.name}`
                                }
                            }))}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Quantidade</label>
                        <input
                            value={amount}
                            type="number"
                            onChange={(e) => { setAmount(Number(e.target.value)) }}
                            placeholder="Quantidade do produto"
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

export default ListItemCreationModal;