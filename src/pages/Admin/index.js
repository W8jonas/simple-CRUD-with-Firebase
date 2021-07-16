import React, { useEffect, useState } from 'react'
import { Product } from '../../Components/Product'
import { auth, database } from '../../services/firebase';
import './styles.css'

export function Admin() {
    const [products, setProducts] = useState([])

    function handleAddData(event) {
        event.preventDefault()
        const user = auth.currentUser;
        const { uid } = user

        database.collection("userProducts").doc(uid).collection("products").add({})
            .then((docRef) => {
                setProducts((prev) => [...prev, {id: docRef.id}]);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
    }

    function handleDeleteProduct(productId) {
        const user = auth.currentUser;
        const { uid } = user

        database.collection("userProducts").doc(uid).collection("products").doc(productId).delete()
            .then(() => {
                setProducts( (prev) => prev.filter(prevProducts => prevProducts.id !== productId) )
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return alert('Você precisa estar logado') 

        const { uid } = user

        database.collection("userProducts")
            .doc(uid)
            .collection("products")
            .get()
            .then((querySnapshot) => {
                const arraySnapshot = []
                querySnapshot.forEach((doc) => {
                    arraySnapshot.push({id: doc.id, ...doc.data()})
                })
                setProducts(arraySnapshot)
            })
    }, [])

    return (
        <div>
            <h1>Painel de admin</h1>
            
            <h4>Produtos atuais</h4>
            
            {products.map((product) => (
                <div>
                    <Product 
                        key={product.id}
                        id={product.id}
                    />

                    <button
                        className="add-data-button" 
                        onClick={() => handleDeleteProduct(product.id)}
                    >
                        Remover produto
                    </button>
                </div>
            ))}

            <br/>
            <button
                className="button" 
                onClick={handleAddData}
            >
                Adicionar novo produto
            </button>
        </div>
    )
}
