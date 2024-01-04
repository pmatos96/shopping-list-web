import React, { useState } from "react";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;

        switch(name){
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const signIn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                navigate("/")
            })
            .catch(error => {
                setErrorMessage("Login ou senha inválidos");
            })
    }

    const signUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setSuccessMessage("Cadastro realizado com sucesso!")
            })
            .catch(error => {
                setErrorMessage("Não foi possível fazer o cadastro");
            })
    }

    return <div className="p-4 w-screen h-screen flex items-center justify-center">
        <Segment >
            <Form error={!!errorMessage}>
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
                {!!errorMessage && <Message error header='Algo deu errado' content={errorMessage}/>}
                {!!successMessage && <Message positive content={successMessage}/>}
                <Button positive fluid onClick={signIn}>Login</Button>
                <Button fluid onClick={signUp}>Cadastre-se</Button>
            </Form>
        </Segment>
    </div>
}

export default LoginPage;