import { Icon, Segment } from "semantic-ui-react";
import React from "react";
import { ShoppingList } from "../types/shoppingListTypes";
import MainApi from "../apis/mainApi";
import { useNavigate } from "react-router-dom";

type ShoppingListSelection = ShoppingList & {
    deleteList: Function
}

const ShoppingListSelection = ({ name, id, deleteList }: ShoppingListSelection) => {

    const navigate = useNavigate();

    const handleDeleteButtonClick = () => {
        deleteList(id);
    }

    const goToListItemsPage = () => {

        navigate(`/lista/${id}`)
    }

    return (
        <Segment className="flex justify-between">
            <span className="cursor-pointer" onClick={goToListItemsPage}>{name}</span>
            <Icon name="trash alternate" onClick={handleDeleteButtonClick} />
        </Segment>
    )
}

export default ShoppingListSelection;