import React, { createContext, useContext, useEffect, useState } from "react";
import { GroupedItemsBySection, ListItem } from "../types/shoppingListTypes";
import { useLoader } from "../components/LoaderContext";
import MainApi from "../apis/mainApi";
import { useParams } from "react-router-dom";
import { Accordion } from "semantic-ui-react";
import SectionGroupingBoard from "../components/SectionGroupingBoard";

const ItemsUpdatingContext = createContext(() => { });

const ListItemsPage = () => {

    const { listId } = useParams();

    const [listItems, setListItems] = useState<ListItem[]>([]);
    const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

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
        <ItemsUpdatingContext.Provider value={setUpdatedListItems}>
            <div className="pt-4">
                <Accordion className="p-4 w-screen" styled>
                    {(listItems && groupItemsByProductSection(listItems) || []).map((sectionGroupedItems: GroupedItemsBySection, index: number) => {
                        return <SectionGroupingBoard
                            section={sectionGroupedItems.section}
                            items={sectionGroupedItems.items}
                            index={index}
                            activeIndex={activeItemIndex}
                            setActive={setActiveItemIndex}
                            listId={Number(listId)}
                        />
                    })}
                </Accordion>
            </div>
        </ItemsUpdatingContext.Provider>
    )
}

export function useItemsUpdatingContext() {
    return useContext(ItemsUpdatingContext)
}

export default ListItemsPage;