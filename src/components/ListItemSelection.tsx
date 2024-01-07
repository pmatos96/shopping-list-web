import React, { ChangeEvent, FocusEvent, useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Icon,
  Input,
  Label,
  Segment,
} from "semantic-ui-react";
import { ListItem } from "../types/shoppingListTypes";
import MainApi from "../apis/mainApi";
import { useLoader } from "./LoaderContext";
import { useItemsUpdatingContext } from "../pages/ListItemsPage";

const ListItemSelection = ({ id, product, amount, observation , listId, done }: ListItem) => {
  const { showLoader, hideLoader, isLoading } = useLoader();
  const setUpdatedListItems = useItemsUpdatingContext();

  const [isChecked, setIsChecked] = useState<boolean>(done);
  const [currentAmount, setCurrentAmount] = useState<number>(amount);
  const [currentObservation, setCurrentObservation] = useState<string | null>(observation || null);
  const [observationVisible, setObservationVisible] = useState<boolean>(false);

  const handleCheckItem = () => {
    showLoader();
    MainApi.setOrUnsetItemChecked(listId, id).then((response) => {
      setIsChecked(response.done);
      setUpdatedListItems();
      hideLoader();
    });
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const amountValue = Number(event.target.value);
    changeItemAmount(amountValue);
  };

  const handleAmountIncrease = () => {
    changeItemAmount(currentAmount + 1);
  };

  const handleAmountDecrease = () => {
    changeItemAmount(currentAmount - 1);
  };

  const changeItemAmount = (newAmount: number) => {
    showLoader();
    MainApi.updateListItemAmount(listId, id, newAmount).then((response) => {
      setCurrentAmount(response.amount);
      hideLoader();
    });
  };

  const handleObservationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const observationValue = event.target.value;
    setCurrentObservation(observationValue);
  };

  const handleObservationBlur = (event: FocusEvent<HTMLInputElement>) => {
    if(currentObservation && currentObservation){
      showLoader();
      MainApi.updateListItemObservation(listId, id, currentObservation).then((response) => {
        hideLoader();
      });
    }
  }

  const handleDeleteItem = () => {
    showLoader();
    MainApi.deleteListItem(listId, id).then(() => {
      hideLoader();
      setUpdatedListItems();
    });
  };

  return (
    <Segment >
      <div className="flex justify-between items-center">
        <div className="flex items-center max-w-[40%]">
          <Checkbox
            className="mr-2"
            readOnly={isLoading}
            checked={isChecked}
            onChange={handleCheckItem}
          />
          <span className={"" + (isChecked ? "line-through" : "")}>
            {product.name}
          </span>
        </div>
        <div className="w-[25%]">
          <Input readOnly={isChecked} size="small">
            <input
              className="w-[20%] p-0"
              type="number"
              value={currentAmount}
              onChange={handleAmountChange}
            />
          </Input>
        </div>
        <div className="flex items-center justify-between">
          <Button.Group size="small" vertical>
            {!isChecked && (
              <Button size="small" icon onClick={handleAmountIncrease}>
                <Icon name="plus" />
              </Button>
            )}
            {currentAmount > 1 && !isChecked && (
              <Button size="small" icon onClick={handleAmountDecrease}>
                <Icon name="minus" />
              </Button>
            )}
            <Button size="small" icon onClick={handleDeleteItem}>
              <Icon name="trash alternate" />
            </Button>
          </Button.Group>
        </div>
      </div>
      <div>
        <Icon name={observationVisible ? "minus" : "plus"} onClick={() => {setObservationVisible(!observationVisible)}}/>
        {observationVisible ? "Esconder observação" : "Ver observação"}
        {observationVisible && <Input fluid size="big">
            <input
              className="w-[20%] p-0"
              type="text"
              value={currentObservation || ""}
              onChange={handleObservationChange}
              onBlur={handleObservationBlur}
            />
        </Input>}
      </div>
    </Segment>
  );
};

export default ListItemSelection;
