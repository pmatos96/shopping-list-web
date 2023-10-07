import React, { useState } from "react";
import { Button, Checkbox, Icon, Input, Label, Segment } from "semantic-ui-react";
import { ListItem } from "../types/shoppingListTypes";
import MainApi from "../apis/mainApi";
import { useLoader } from "./LoaderContext";

const ListItemSelection = ({ id, product, amount, listId, done }: ListItem) => {

    const { showLoader, hideLoader, isLoading } = useLoader();

    const [isChecked, setIsChecked] = useState<boolean>(done);

    const handleCheckItem = () => {
        showLoader();
        MainApi.setOrUnsetItemChecked(listId, id).then((response) => {
            setIsChecked(response.done)
            hideLoader();
        })
    }

    return (
        <Segment className="flex justify-between items-center">
            <div>
                <Checkbox readOnly={isLoading} checked={isChecked} onChange={handleCheckItem} />
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