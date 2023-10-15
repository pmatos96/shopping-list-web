import React, { useEffect, useState } from "react";
import { ShoppingList } from "../types/shoppingListTypes";
import MainApi from "../apis/mainApi";
import ShoppingListCreationModal from "../components/ShoppingListCreationModal";
import GenericConfirmModal from "../components/GenericConfirmModal";
import { Container, Divider, Header, Icon, Segment } from "semantic-ui-react";
import ShoppingListSelection from "../components/ShoppingListSelection";
import { useLoader } from "../components/LoaderContext";
import ShoppingListDuplicatingModal from "../components/ShoppingListDuplicatingModal";

const ShoppingListsPage = () => {

    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
    const [creationModalOpen, setCreationModalOpen] = useState<boolean>(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [listIdOnDeleting, setListIdOnDeleting] = useState<number>();

    const [duplicateModalOpen, setDuplicateModalOpen] = useState<boolean>(false);
    const [listIdOnDuplicating, setListIdOnDuplicating] = useState<number>(0);

    const { showLoader, hideLoader } = useLoader();

    const setUpdatedShoppingLists = () => {
        showLoader()
        MainApi.getLists()
            .then(setShoppingLists)
            .then(() => hideLoader());
    }

    const handleDeleteButtonClick = (id: number) => {
        setListIdOnDeleting(id);
        setDeleteModalOpen(true);
    }

    const handleDuplicateButtonClick = (id: number) => {
        setListIdOnDuplicating(id);
        setDuplicateModalOpen(true);
    }

    const deleteShoppingList = async (id: number) => {
        showLoader();
        await MainApi.deleteList(id);
        hideLoader();
        setUpdatedShoppingLists();
    }

    const createShoppingList = async (name: string) => {
        showLoader();
        await MainApi.createList(name);
        hideLoader();
        setUpdatedShoppingLists();
    }

    const duplicateShoppingList = async (id: number, name: string) => {
        showLoader();
        await MainApi.duplicateList(id,name);
        hideLoader();
        setUpdatedShoppingLists();
    }

    useEffect(() => {
        setUpdatedShoppingLists();
    }, [])

    return (
        <div className="p-4 w-screen">
            <ShoppingListCreationModal
                createShoppingList={createShoppingList}
                open={creationModalOpen}
                setOpen={setCreationModalOpen}
            />
            <ShoppingListDuplicatingModal
                duplicateShoppingList={duplicateShoppingList}
                open={duplicateModalOpen}
                setOpen={setDuplicateModalOpen}
                listId={listIdOnDuplicating}
            />
            <GenericConfirmModal
                title='Remover lista'
                message='Deseja remover a lista selecionada?'
                open={deleteModalOpen}
                setOpen={setDeleteModalOpen}
                onConfirm={deleteShoppingList}
                auxiliarData={listIdOnDeleting}
            />
            <Container fluid className="w-full">
                <Header>
                    <Icon name='shopping cart' size='tiny' />
                    <Header.Content as={'h1'}>Minhas listas</Header.Content>
                </Header>
                <Divider />
                <Icon name="plus" size="big" onClick={() => setCreationModalOpen(true)} />
                <Segment.Group className="w-full">
                    {
                        (shoppingLists || []).map((list: ShoppingList) => {
                            return <ShoppingListSelection
                                key={list.id}
                                id={list.id}
                                name={list.name}
                                deleteList={() => handleDeleteButtonClick(list.id)}
                                duplicateList={() => handleDuplicateButtonClick(list.id)}
                            />
                        })
                    }
                </Segment.Group>
            </Container>
        </div>
    );
}

export default ShoppingListsPage;