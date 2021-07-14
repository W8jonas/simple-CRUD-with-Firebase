import React, { useCallback, useState } from 'react'
import { Product } from '../../Components/Product'
import { auth, database } from '../../services/firebase';

export function Admin() {
    const [products, setProducts] = useState([{id: Math.round(Math.random() * 100000).toString()}])

    function handleAddData(event) {
        event.preventDefault()
        const user = auth.currentUser;
        const { uid } = user

        database.collection("userProducts").doc(uid).collection("products").add({})
            .then((docRef) => {
                console.log(docRef.id)
                setProducts((prev) => [...prev, {id: docRef.id}]);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
    }

    return (
        <div>
            <h1>Painel de admin</h1>
            
            <h4>Produtos atuais</h4>
            
            {products.map((product, index) => (
                <Product 
                    key={product.id}
                    id={product.id}
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
