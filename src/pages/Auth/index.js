import React from 'react'
import './styles.css' 


export function Auth() {
    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <div id="container">
            <h1>Pagina Autenticação</h1>

            <h4>Você precisa estar autenticado para continuar</h4>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite seu nome"
                />

                <input
                    type="text"
                    placeholder="Digite seu email"
                />

                <input
                    type="text"
                    placeholder="Digite sua senha"
                />

            </form>

        </div>
    )
} 