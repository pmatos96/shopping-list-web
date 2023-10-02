import { Container, Dimmer, Divider, Header, Icon, Loader, Segment } from 'semantic-ui-react'
import ShoppingListSelection from './components/ShoppingListSelection';
import React, { useEffect, useState } from 'react';
import { ShoppingList } from './types/shoppingListTypes';
import MainApi from './apis/mainApi';
import ShoppingListCreationModal from './components/ShoppingListCreationModal';
import GenericConfirmModal from './components/GenericConfirmModal';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ShoppingListPage from './pages/ShoppingListsPage';
import { LoaderProvider, useLoader } from './components/LoaderContext';
import Spinner from './components/Spinner';
function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <ShoppingListPage />,
      // children: [
      //   {
      //     path: "team",
      //     element: <Team />,
      //     loader: teamLoader,
      //   },
      // ],
    },
  ])

  return (
    <>
      <LoaderProvider>
        <Spinner />
        <RouterProvider router={router} />
      </LoaderProvider>
    </>
  )
}

export default App;
