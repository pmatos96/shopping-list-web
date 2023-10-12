export type ShoppingList = {
    id: number,
    name: string,
    key?: number
}

type Section = {
    id: number,
    name: string,
    color: string
}

export type Product = {
    id: number,
    name: string,
    section: Section
}

export type ListItem = {
    id: number,
    product: Product,
    amount: number,
    listId: number,
    done: boolean
}

export type ListItemsPageElement = {
    listId: number,
    listName: string
}

export type GroupedItemsBySection = {
    section: Section,
    items: ListItem[]
}