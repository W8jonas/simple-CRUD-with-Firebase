import React, { useEffect, useState } from 'react'
import { ProductList } from '../../Components/ProductList'
import { database } from '../../services/firebase';

export function Home() {

    return (
        <div>
            <h1>Pagina Home</h1>
            
            <h4>Produtos atuais</h4>
            
            {products.map((product) => (
                <ProductList
                    key={product.id}
                    id={product.id}
                />
            ))}

            <button
                className="button" 
                // onClick={handleAddData}
            >
                Para adicionar um novo produto cadastre-se
            </button>
        </div>
    )
} 
