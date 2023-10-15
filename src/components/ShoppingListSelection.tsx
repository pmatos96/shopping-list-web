import { Icon, Segment } from "semantic-ui-react";
import React from "react";
import { ShoppingList } from "../types/shoppingListTypes";
import MainApi from "../apis/mainApi";
import { useNavigate } from "react-router-dom";

type ShoppingListSelection = ShoppingList & {
    deleteList: Function,
    duplicateList: Function
}

const ShoppingListSelection = ({ name, id, deleteList, duplicateList }: ShoppingListSelection) => {

    const navigate = useNavigate();

    const handleDeleteButtonClick = () => {
        deleteList(id);
    }

    const copyButtonClick = () => {
        duplicateList(id);
    }

    const goToListItemsPage = () => {

        navigate(`/lista/${id}`)
    }

    return (
        <Segment className="flex justify-between">
            <span className="cursor-pointer" onClick={goToListItemsPage}>{name}</span>
            <div className="w-[15vw] flex justify-between">
                <Icon name="trash alternate" onClick={handleDeleteButtonClick} />
                <Icon className="ml-2" name="copy" onClick={copyButtonClick} />
            </div>
        </Segment>
    )
}

export default ShoppingListSelection;