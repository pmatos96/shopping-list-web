import axios from "axios"
import { ListItem, ShoppingList } from "../types/shoppingListTypes";

export default class MainApi {

    static baseUrl = "http://localhost:3000/" || process.env.REACT_APP_API_BASE_URL

    static getLists = async (): Promise<ShoppingList[]> => {
        try {
            const response = await axios.get(`${this.baseUrl}shopping-lists/`);
            if (response.status === 200) {
                return response.data;
            }
            else {
                throw `Status ${response.status}`;
            }

        }
        catch (err) {
            throw `It was not possible to call 'getLists' Error: ${err}`;
        }
    }

    static deleteList = async (id: number) => {
        try {
            await axios.delete(`${this.baseUrl}shopping-lists/${id}`)
        }
        catch (err) {
            throw `It was not possible to call 'deleteList' Error: ${err}`;
        }
    }

    static createList = async (name: string) => {
        try {
            let newList = await axios.post(`${this.baseUrl}shopping-lists/`, {
                name
            })

            return newList;
        }
        catch (err) {
            throw `It was not possible to call 'createList' Error: ${err}`;
        }
    }

    static getItemsByList = async (listId: number): Promise<ListItem[]> => {
        try {
            let response = await axios.get(`${this.baseUrl}shopping-lists/${listId}/items/`);

            if (response.status === 200) {
                return response.data;
            }
            else {
                throw `Status ${response.status}`;
            }
        }
        catch (err) {
            throw `It was not possible to call 'getItemsByList' Error: ${err}`;
        }
    }
}