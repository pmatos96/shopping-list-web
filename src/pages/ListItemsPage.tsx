import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GroupedItemsBySection,
  ListItem,
  Product,
} from "../types/shoppingListTypes";
import { useLoader } from "../components/LoaderContext";
import MainApi from "../apis/mainApi";
import { useNavigate, useParams } from "react-router-dom";
import { Accordion, Icon, Progress } from "semantic-ui-react";
import SectionGroupingBoard from "../components/SectionGroupingBoard";
import ListItemCreationModal from "../components/ListItemCreationModal";

const ItemsUpdatingContext = createContext(() => {});

const ListItemsPage = () => {
  const { listId } = useParams();

  const navigate = useNavigate();

  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [creationModalOpen, setCreationModalOpen] = useState<boolean>(false);

  const { showLoader, hideLoader } = useLoader();

  const setUpdatedListItems = () => {
    showLoader();
    MainApi.getItemsByList(Number(listId))
      .then(setListItems)
      .then(() => hideLoader());
  };

  const groupItemsByProductSection = (items: ListItem[]) => {
    return items.reduce((acc: GroupedItemsBySection[], item) => {
      const section = item.product.section;

      const existingGroup = acc.find(
        (group: GroupedItemsBySection) => group.section.id === section.id
      );

      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        acc.push({ section, items: [item] });
      }

      return acc;
    }, []);
  };

  const createListItem = async (
    product: Product,
    amount: number,
    listId: number
  ) => {
    showLoader();
    await MainApi.createListItem(product, amount, listId);
    setUpdatedListItems();
    hideLoader();
  };

  const backToListSelection = () => {
    navigate("/");
  };

  useEffect(() => {
    setUpdatedListItems();
  }, []);

  return (
    <ItemsUpdatingContext.Provider value={setUpdatedListItems}>
      <div className="p-4 w-screen">
        <div className="flex justify-between items-center">
          <Icon
            name="plus"
            size="big"
            className="cursor-pointer"
            onClick={() => setCreationModalOpen(true)}
          />
          <Icon
            name="arrow left"
            size="big"
            className="cursor-pointer"
            onClick={backToListSelection}
          />
        </div>
        <Progress
          percent={(
            (100 * listItems.filter((item) => item.done).length) /
            listItems.length
          ).toFixed(2)}
          indicating
          progress
        />
        <Accordion className="mt-4" fluid styled>
          {listItems && listItems.length > 0 ? (
            ((listItems && groupItemsByProductSection(listItems)) || []).map(
              (sectionGroupedItems: GroupedItemsBySection, index: number) => {
                return (
                  <SectionGroupingBoard
                    section={sectionGroupedItems.section}
                    items={sectionGroupedItems.items}
                    index={index}
                    activeIndex={activeItemIndex}
                    setActive={setActiveItemIndex}
                    listId={Number(listId)}
                  />
                );
              }
            )
          ) : (
            <p>Nenhum Item na lista!</p>
          )}
        </Accordion>
        <ListItemCreationModal
          createListItem={createListItem}
          listId={Number(listId)}
          open={creationModalOpen}
          setOpen={setCreationModalOpen}
        />
      </div>
    </ItemsUpdatingContext.Provider>
  );
};

export function useItemsUpdatingContext() {
  return useContext(ItemsUpdatingContext);
}

export default ListItemsPage;
