import React, { useCallback, useState } from 'react'
import { Product } from '../../Components/Product'

export function Admin() {
    const [products, setProducts] = useState([{id: Math.random()}])

    function handleAddData(event) {
        event.preventDefault()
        setProducts((prev) => [...prev, {id: Math.random()}]);
    }

    return (
        <div>
            <h1>Painel de admin</h1>
            
            <h4>Produtos atuais</h4>
            
            {products.map((product, index) => (
                <Product 
                    key={product.id} 
                    {...product} 
                />
            ))}

            <button
                className="button" 
                onClick={handleAddData}
            >
                Adicionar novo produto
            </button>
        </div>
    )
}
