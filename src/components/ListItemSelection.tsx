import React, { ChangeEvent, useContext, useState } from "react";
import { Button, Checkbox, Icon, Input, Label, Segment } from "semantic-ui-react";
import { ListItem } from "../types/shoppingListTypes";
import MainApi from "../apis/mainApi";
import { useLoader } from "./LoaderContext";
import { useItemsUpdatingContext } from "../pages/ListItemsPage";

const ListItemSelection = ({ id, product, amount, listId, done }: ListItem) => {

    const { showLoader, hideLoader, isLoading } = useLoader();
    const setUpdatedListItems = useItemsUpdatingContext();

    const [isChecked, setIsChecked] = useState<boolean>(done);
    const [currentAmount, setCurrentAmount] = useState<number>(amount);

    const handleCheckItem = () => {
        showLoader();
        MainApi.setOrUnsetItemChecked(listId, id).then((response) => {
            setIsChecked(response.done)
            hideLoader();
        })
    }

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const amountValue = Number(event.target.value);
        changeItemAmount(amountValue);
    }

    const handleAmountIncrease = () => {
        changeItemAmount(currentAmount + 1)
    }

    const handleAmountDecrease = () => {
        changeItemAmount(currentAmount - 1)
    }

    const changeItemAmount = (newAmount: number) => {
        showLoader();
        MainApi.updateListItemAmount(listId, id, newAmount).then((response) => {
            setCurrentAmount(response.amount);
            hideLoader();
        })
    }

    const handleDeleteItem = () => {
        showLoader();
        MainApi.deleteListItem(listId, id).then(() => {
            hideLoader();
        })
        setUpdatedListItems();
    }

    return (
        <Segment className="flex justify-between items-center">
            <div>
                <Checkbox readOnly={isLoading} checked={isChecked} onChange={handleCheckItem} />
                <span className={isChecked ? "line-through" : ""}>{product.name}</span>
            </div>
            <div className="flex justify-center">
                <Input
                    className="w-[17%]"
                    readOnly={isChecked}
                    type="text"
                    value={currentAmount}
                    onChange={handleAmountChange}
                />
                <Button.Group size="mini">
                    {!isChecked && <Button size="mini" icon onClick={handleAmountIncrease}>
                        <Icon name='plus' />
                    </Button>}
                    {currentAmount > 1 && !isChecked && <Button size="mini" icon onClick={handleAmountDecrease}>
                        <Icon name='minus' />
                    </Button>}
                    <Button size="mini" icon onClick={handleDeleteItem}>
                        <Icon name='trash alternate' />
                    </Button>
                </Button.Group>
            </div>
        </Segment>
    )
}

export default ListItemSelection;