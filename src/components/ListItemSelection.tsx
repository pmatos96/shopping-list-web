import React from "react";
import { Checkbox, Segment } from "semantic-ui-react";
import { ListItem } from "../types/shoppingListTypes";

const ListItemSelection = ({ id, product, amount }: ListItem) => {

    return (
        <Segment className="flex justify-between">
            <span>{product.name}</span>
            <Checkbox />
        </Segment>
    )
}

export default ListItemSelection;