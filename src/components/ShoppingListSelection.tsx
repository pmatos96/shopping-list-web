import { Icon, Segment } from "semantic-ui-react";
import React from "react";
import { ShoppingList } from "../types/shoppingListTypes";
import MainApi from "../apis/mainApi";

type ShoppingListSelection = ShoppingList & {
    deleteList: Function
}

const ShoppingListSelection = ({ name, id, deleteList }: ShoppingListSelection) => {

    const handleDeleteButtonClick = () => {
        deleteList(id);
    }

    return (
        <Segment className="flex justify-between">
            {name}
            <Icon name="trash alternate" onClick={handleDeleteButtonClick} />
        </Segment>
    )
}

export default ShoppingListSelection;