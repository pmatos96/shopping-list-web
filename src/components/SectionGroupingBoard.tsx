import React, { useEffect } from "react";
import { Accordion, Icon, Segment } from "semantic-ui-react";
import { GroupedItemsBySection } from "../types/shoppingListTypes";
import ListItemSelection from "./ListItemSelection";

type SectionGroupingBoardInput = GroupedItemsBySection & {
    index: number,
    activeIndex: number,
    setActive: Function
}

const SectionGroupingBoard = ({ section, items, index, activeIndex, setActive }: SectionGroupingBoardInput) => {

    useEffect(() => {
        console.log(items)
    }, [])

    return (
        <>
            <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={() => setActive(index)}
            // style={{ backgroundColor: `#${section.color}`, opacity: 0.5 }}
            >
                <Icon name='dropdown' />
                {section.name}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
                <Segment.Group>
                    {items.map(item => {
                        return <ListItemSelection id={item.id} amount={item.amount} product={item.product} />
                    })}
                </Segment.Group>
            </Accordion.Content>
        </>
    )
}

export default SectionGroupingBoard;