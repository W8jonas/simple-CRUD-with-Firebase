import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input } from '../../Components/Input'
import './styles.css' 
import { auth, database, firebase } from '../../services/firebase'

export function Auth() {
    const history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

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

    function handleLogin() {
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

            <form onSubmit={handleSubmit}>
                <Input
                    name="name"
                    label="Nome completo"
                    type="text"
                    placeholder="Nome de usuário"
                    value={name}
                    onChange={(e)=>setName(e.target.value)} 
                />

                <Input
                    name="email"
                    label="E-mail"
                    type="text"
                    placeholder="Endereço de e-mail"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} 
                />

                <Input
                    name="password"
                    label="Senha"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                />

                <Input
                    name="confirmPassword"
                    label="Confirme sua senha"
                    type="password"
                    placeholder="Senha"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                />

                <button className="buttonAuth" type="submit">Crie sua conta agora</button>
                
                <button className="buttonAuth" type="submit" onClick={handleLogin}>Entrar com sua conta agora</button>

                <button className="buttonAuth" onClick={handleSignInWithGoogle}>Ou entre com sua conta do Google</button>

                <br />

                <div className="google-btn" onClick={handleSignInWithGoogle}>
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                    </div>
                    <p className="btn-text"><b>Entre com google</b></p>
                </div>

            </form>

        </div>
    )
} 
