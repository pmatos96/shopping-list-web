import { signOut } from "firebase/auth";
import auth from "../firebase";

export const logoutOut = (e: React.MouseEvent<HTMLButtonElement>, callback: VoidFunction) => {

    e.preventDefault();
    signOut(auth)
        .then(userCredential => {
            callback()
        })
        .catch(error => {
            console.log(error);
        })
}