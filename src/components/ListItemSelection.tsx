import React from "react";
import { Button, Checkbox, Icon, Input, Label, Segment } from "semantic-ui-react";
import { ListItem } from "../types/shoppingListTypes";

const ListItemSelection = ({ id, product, amount }: ListItem) => {

    return (
        <Segment className="flex justify-between items-center">
            <div>
                <Checkbox />
                <span>{product.name}</span>
            </div>
            <div className="flex justify-center">
                <Input
                    className="w-[17%]"
                    type="text"
                    value={amount}
                />
                <Button.Group size="mini">
                    <Button size="mini" icon>
                        <Icon name='plus' />
                    </Button>
                    <Button size="mini" icon>
                        <Icon name='minus' />
                    </Button>
                    <Button size="mini" icon>
                        <Icon name='trash alternate' />
                    </Button>
                </Button.Group>
            </div>
        </Segment>
    )
}

export default ListItemSelection;