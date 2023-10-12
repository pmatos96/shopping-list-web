import React, { useEffect } from "react";
import { Accordion, Icon, Segment } from "semantic-ui-react";
import { GroupedItemsBySection } from "../types/shoppingListTypes";
import ListItemSelection from "./ListItemSelection";

type SectionGroupingBoardInput = GroupedItemsBySection & {
    index: number,
    activeIndex: number,
    setActive: Function,
    listId: number
}

const SectionGroupingBoard = ({ section, items, index, activeIndex, setActive, listId }: SectionGroupingBoardInput) => {

    useEffect(() => {
        console.log(items)
    }, [])

    return (
        <>
            <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={() => setActive(index)}
            >
                <Icon name='dropdown' />
                <span style={{ color: `#${section.color}` }}>{section.name}</span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
                <Segment.Group>
                    {items.map(item => {
                        return <ListItemSelection
                            listId={listId}
                            id={item.id}
                            amount={item.amount}
                            product={item.product}
                            done={item.done}
                        />
                    })}
                </Segment.Group>
            </Accordion.Content>
        </>
    )
}

export default SectionGroupingBoard;