import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input } from '../../Components/Input'
import './styles.css' 
import { auth } from '../../services/firebase'

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
                history.push('/admin')
            })
            .catch((error) => {
                console.log('error: ', error)
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
                    secret={true}
                />

                <button type="submit">Crie sua conta agora</button>

            </form>

        </div>
    )
} 
