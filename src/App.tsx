import { Container, Header, Icon, Segment } from 'semantic-ui-react'
import ShoppingListSelection from './components/ShoppingListSelection';
import React from 'react';
import { ShoppingList } from './types/shoppingListTypes';
function App() {

  const shoppingLists = [
    {
      name: "Lista 1",
      id: 1
    },
    {
      name: "Lista 2",
      id: 2
    }
  ]

  return (
    <div className="App" style={{ paddingTop: '5%' }}>
      <Container text>
        <Header>
          <Icon name='shopping cart' size='tiny' />
          <Header.Content as={'h1'}>Minhas listas</Header.Content>
        </Header>
        <Segment.Group>
          {
            (shoppingLists || []).map((list: ShoppingList) => {
              return <ShoppingListSelection key={list.id} id={list.id} name={list.name} />
            })
          }
        </Segment.Group>
      </Container>
    </div>
  );
}

export default App;
