import { Segment } from "semantic-ui-react";
import React from "react";
import { ShoppingList } from "../types/shoppingListTypes";

const ShoppingListSelection = ({ name, id }: ShoppingList) => {

    return (
        <Segment>
            {name}
        </Segment>
    )
}

export default ShoppingListSelection;