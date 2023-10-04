import React, { useEffect, useState } from "react";
import { ListItem } from "../types/shoppingListTypes";
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

    useEffect(() => {
        setUpdatedListItems();
    }, [])

    return (
        <div className="pt-4">
            {(listItems || []).map(item => {
                return (<div>{item.id}</div>)
            })}
        </div>
    )
}

export default ListItemsPage;