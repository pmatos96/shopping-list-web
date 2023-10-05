import React, { useEffect, useState } from "react";
import { GroupedItemsBySection, ListItem } from "../types/shoppingListTypes";
import { useLoader } from "../components/LoaderContext";
import MainApi from "../apis/mainApi";
import { useParams } from "react-router-dom";

const ListItemsPage = () => {

    const { listId } = useParams()

    const [listItems, setListItems] = useState<ListItem[]>();

    const { showLoader, hideLoader } = useLoader();

    const setUpdatedListItems = () => {
        showLoader()
        MainApi.getItemsByList(Number(listId))
            .then(setListItems)
            .then(() => hideLoader());
    }

    const groupItemsByProductSection = (items: ListItem[]) => {
        return items.reduce((acc: GroupedItemsBySection[], item) => {
            const section = item.product.section;

            const existingGroup = acc.find((group: GroupedItemsBySection) => group.section.id === section.id);

            if (existingGroup) {
                existingGroup.items.push(item);
            } else {
                acc.push({ section, items: [item] });
            }

            return acc;
        }, []);
    }

    useEffect(() => {
        setUpdatedListItems();
    }, [])

    return (
        <div className="pt-4">
            {(listItems || []).map(item => {
                return (<div>{item.product.name}</div>)
            })}
        </div>
    )
}

export default ListItemsPage;