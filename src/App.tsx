import { Container, Divider, Header, Icon, Segment } from 'semantic-ui-react'
import ShoppingListSelection from './components/ShoppingListSelection';
import React, { useEffect, useState } from 'react';
import { ShoppingList } from './types/shoppingListTypes';
import MainApi from './apis/mainApi';
import ShoppingListCreationModal from './components/ShoppingListCreationModal';
import GenericConfirmModal from './components/GenericConfirmModal';
function App() {

  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [creationModalOpen, setCreationModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [listIdOnDeleting, setListIdOnDeleting] = useState<number>();

  const setUpdatedShoppingLists = () => {
    MainApi.getLists().then(setShoppingLists)
  }

  const handleDeleteButtonClick = (id: number) => {
    setListIdOnDeleting(id);
    setDeleteModalOpen(true);
  }

  const deleteShoppingList = async (id: number) => {
    await MainApi.deleteList(id);
    setUpdatedShoppingLists();
  }

  const createShoppingList = async (name: string) => {
    await MainApi.createList(name);
    setUpdatedShoppingLists();
  }

  useEffect(() => {
    setUpdatedShoppingLists();
  }, [])

  return (
    <div className="pt-4">
      <ShoppingListCreationModal
        createShoppingList={createShoppingList}
        open={creationModalOpen}
        setOpen={setCreationModalOpen}
      />
      <GenericConfirmModal
        title='Remover lista'
        message='Deseja remover a lista selecionada?'
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onConfirm={deleteShoppingList}
        auxiliarData={listIdOnDeleting}
      />
      <Container fluid>
        <Header>
          <Icon name='shopping cart' size='tiny' />
          <Header.Content as={'h1'}>Minhas listas</Header.Content>
        </Header>
        <Divider />
        <Icon name="plus" size="big" onClick={() => setCreationModalOpen(true)} />
        <Segment.Group>
          {
            (shoppingLists || []).map((list: ShoppingList) => {
              return <ShoppingListSelection
                key={list.id}
                id={list.id}
                name={list.name}
                deleteList={() => handleDeleteButtonClick(list.id)}
              />
            })
          }
        </Segment.Group>
      </Container>
    </div>
  );
}

export default App;
