import axios from "axios"
import { ShoppingList } from "../types/shoppingListTypes";

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
}