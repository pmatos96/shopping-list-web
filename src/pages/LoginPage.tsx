import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

const LoginPage = () => {

    return <div className="p-4 w-screen h-screen flex items-center justify-center">
        <Segment >
            <Form>
                <Form.Field>
                    <label>E-mail</label>
                    <input placeholder='Seu melhor endereço de e-mail' />
                </Form.Field>
                <Form.Field>
                    <label>Senha</label>
                    <input type="password" placeholder='Sua senha' />
                </Form.Field>
                <Button positive fluid>Login</Button>
                <Button fluid>Cadastre-se</Button>
            </Form>
        </Segment>
    </div>
}

export default LoginPage;