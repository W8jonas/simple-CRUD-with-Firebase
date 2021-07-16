import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input } from '../../Components/Input'
import { auth, database, firebase } from '../../services/firebase'
import { Form } from '@unform/web'

import './styles.css' 

export function Auth() {
    const history = useHistory()
    const formRef = useRef(null);

    function handleSubmit(data) {
        const {name, email, password, confirmPassword} = data

        if (!email) return alert('É necessário e-mail válido')
        if (password !== confirmPassword) return alert('Senhas diferentes')

        auth.createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const user = response.user
                database.collection("users").add({uid: user.uid, name})

                history.push('/admin')
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    function handleLogin(event) {
        event.preventDefault()

        const data = formRef.current.getData();
        const {email, password, confirmPassword} = data

        if (!email) return alert('É necessário e-mail válido')
        if (password !== confirmPassword) return alert('Senhas diferentes')

        auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                history.push('/admin')
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    function handleSignInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
    
        auth.signInWithPopup(provider).then(result => {
            if (result.user) {
                const {displayName, uid} = result.user

                database.collection("users").add({uid: uid, name: displayName})

                history.push('/admin')
            }
        })
    }


    return (
        <div id="container">
            <h1>Pagina Autenticação</h1>

            <h4>Você precisa estar autenticado para continuar</h4>

            <Form ref={formRef} className="form-auth" onSubmit={handleSubmit}>
                <Input
                    name="name"
                    label="Nome completo"
                    type="text"
                    placeholder="Nome de usuário"
                />

                <Input
                    name="email"
                    label="E-mail"
                    type="text"
                    placeholder="Endereço de e-mail"
                />

                <Input
                    name="password"
                    label="Senha"
                    type="password"
                    placeholder="Senha"
                />

                <Input
                    name="confirmPassword"
                    label="Confirme sua senha"
                    type="password"
                    placeholder="Senha"
                />

                <button className="buttonAuth" type="submit">Crie sua conta agora</button>
                
                <button className="buttonAuth" onClick={handleLogin}>Entrar com sua conta agora</button>

            </Form>

                <br />
                <div className="google-btn" onClick={handleSignInWithGoogle}>
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                    </div>
                    <p className="btn-text"><b>Entre com google</b></p>
                </div>

        </div>
    )
} 
