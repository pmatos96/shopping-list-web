import axios from "axios"
import { ListItem, Product, ShoppingList } from "../types/shoppingListTypes";
import { User } from "firebase/auth";
import auth from "../firebase";

export default class MainApi {

    static baseUrl = process.env.REACT_APP_API_BASE_URL

    static getListsByUser = async (user: User): Promise<ShoppingList[]> => {
        try {
            // const token = await user.getIdToken();
            const token = await auth.currentUser?.getIdToken(true);
            const response = await axios.get(`${this.baseUrl}shopping-lists/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            if (response.status === 200) {
                return response.data?.resp;
            }
            else {
                throw `Status ${response.status}`;
            }

        }
        catch (err) {
            throw `It was not possible to call 'getListsByUser' Error: ${err}`;
        }
    }

    static getListById = async (id: number, user: User): Promise<ShoppingList> => {

        const token = await user.getIdToken();

        try {
            const response = await axios.get(`${this.baseUrl}shopping-lists/${id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                return response.data;
            }
            else {
                throw `Status ${response.status}`;
            }

        }
        catch (err) {
            throw `It was not possible to call 'getListById' Error: ${err}`;
        }
    }

    static deleteList = async (id: number, user: User) => {

        const token = await user.getIdToken();
        try {
            await axios.delete(`${this.baseUrl}shopping-lists/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
        }
        catch (err) {
            throw `It was not possible to call 'deleteList' Error: ${err}`;
        }
    }

    static createList = async (name: string, user: User) => {

        const token = await user.getIdToken();
        try {
            let newList = await axios.post(`${this.baseUrl}shopping-lists/`, {
                name
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
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

    static setOrUnsetItemChecked = async (listId: number, id: number) => {
        try {
            let response = await axios.put(`${this.baseUrl}shopping-lists/${listId}/items/${id}/set-or-unset`);

            if (response.status === 200) {
                return response.data;
            }
            else {
                throw `Status ${response.status}`;
            }
        }
        catch (err) {
            throw `It was not possible to call 'setOrUnsetItemChecked' Error: ${err}`;
        }
    }

    static updateListItemAmount = async (listId: number, id: number, amount: number) => {
        try {
            let response = await axios.put(`${this.baseUrl}shopping-lists/${listId}/items/`, {
                id,
                amount
            });

            if (response.status === 200) {
                return response.data;
            }
            else {
                throw `Status ${response.status}`;
            }
        }
        catch (err) {
            throw `It was not possible to call 'updateListItemAmount' Error: ${err}`;
        }
    }

    static updateListItemObservation = async (listId: number, id: number, observation: string) => {
        try {
            let response = await axios.put(`${this.baseUrl}shopping-lists/${listId}/items/`, {
                id,
                observation
            });

            if (response.status === 200) {
                return response.data;
            }
            else {
                throw `Status ${response.status}`;
            }
        }
        catch (err) {
            throw `It was not possible to call 'updateListItemObservation' Error: ${err}`;
        }
    }

    static deleteListItem = async (listId: number, id: number) => {
        try {
            await axios.delete(`${this.baseUrl}shopping-lists/${listId}/items/${id}`);
        }
        catch (err) {
            throw `It was not possible to call 'deleteListItem' Error: ${err}`;
        }
    }

    static getProducts = async () => {
        try {
            const response = await axios.get(`${this.baseUrl}products/`);
            if (response.status === 200) {
                return response.data;
            }
            else {
                throw `Status ${response.status}`;
            }

        }
        catch (err) {
            throw `It was not possible to call 'getProducts' Error: ${err}`;
        }
    }

    static createListItem = async (product: Product, amount: number, listId: number, observation: string) => {
        try {

            let response = await axios.post(`${this.baseUrl}shopping-lists/${listId}/items/`, {
                productId: product.id,
                amount,
                observation,
                shoppingListId: listId
            })
            if (response.status === 200) {
                return response.data;
            }
            else {
                throw `Status ${response.status}`;
            }
        }
        catch (err) {
            throw `It was not possible to call 'createListItem' Error: ${err}`;
        }
    }

    static duplicateList = async (id: number, name: string, user: User) => {
        const token = await user.getIdToken();
        try {
            let newList = await axios.post(`${this.baseUrl}shopping-lists/${id}/duplicate`, {
                name
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })

            return newList;
        }
        catch (err) {
            throw `It was not possible to call 'duplicateList' Error: ${err}`;
        }
    }
}