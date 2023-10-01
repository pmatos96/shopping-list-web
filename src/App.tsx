import { Container, Header, Icon, Segment } from 'semantic-ui-react'
import ShoppingListSelection from './components/ShoppingListSelection';
import React, { useEffect, useState } from 'react';
import { ShoppingList } from './types/shoppingListTypes';
import MainApi from './apis/mainApi';
function App() {

  // const shoppingLists = [
  //   {
  //     name: "Lista 1",
  //     id: 1
  //   },
  //   {
  //     name: "Lista 2",
  //     id: 2
  //   }
  // ]

  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

  const setUpdatedShoppingLists = () => {
    MainApi.getLists().then(setShoppingLists)
  }

  const deleteShoppingList = async (id: number) => {
    await MainApi.deleteList(id);
    setUpdatedShoppingLists();
  }

  useEffect(() => {
    setUpdatedShoppingLists();
  }, [])

  return (
    <div className="pt-4">
      <Container fluid>
        <Header>
          <Icon name='shopping cart' size='tiny' />
          <Header.Content as={'h1'}>Minhas listas</Header.Content>
        </Header>
        <Segment.Group>
          {
            (shoppingLists || []).map((list: ShoppingList) => {
              return <ShoppingListSelection
                key={list.id}
                id={list.id}
                name={list.name}
                deleteList={deleteShoppingList}
              />
            })
          }
        </Segment.Group>
      </Container>
    </div>
  );
}

export default App;
