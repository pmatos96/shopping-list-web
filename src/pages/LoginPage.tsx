import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";

const LoginPage = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;

        switch(name){
            case 'email':
                setEmail(value);
            case 'password':
                setPassword(value)
            default:
                break;
        }
    }

    const signIn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log(userCredential);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const signUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log(userCredential);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return <div className="p-4 w-screen h-screen flex items-center justify-center">
        <Segment >
            <Form>
                <Form.Field>
                    <label>E-mail</label>
                    <input 
                        placeholder='Seu melhor endereço de e-mail' 
                        onChange={handleInputFieldChange}
                        name='email'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Senha</label>
                    <input 
                        type="password" 
                        placeholder='Sua senha'
                        onChange={handleInputFieldChange}
                        name='password'
                    />
                </Form.Field>
                <Button positive fluid onClick={signIn}>Login</Button>
                <Button fluid onClick={signUp}>Cadastre-se</Button>
            </Form>
        </Segment>
    </div>
}

export default LoginPage;