import React, { useEffect, useState } from 'react'
import { ProductList } from '../../Components/ProductList'
import { database } from '../../services/firebase';

export function Home() {
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([[],[]])

    useEffect(() => {
        database.collection("users")
            .get()
            .then((querySnapshot) => {
                const arrayOfUsers = []
                querySnapshot.forEach((doc) => {
                    arrayOfUsers.push({...doc.data()})
                })
                setUsers(arrayOfUsers)
            })
    }, [])

    useEffect(() => {
        async function getProducts() {
            const promises = users.map(async (user, index) => {
                const response = await database.collection("userProducts")
                    .doc(user.uid)
                    .collection("products")
                    .get()
                
                    const arraySnapshot = []

                    response.forEach((doc) => {
                        arraySnapshot.push({id: doc.id, ...doc.data()})
                    })
                    
                    console.log('arraySnapshot:', arraySnapshot)
                    productsSeparatedByUsers.push(arraySnapshot)
            })

            await Promise.all(promises)
        }

        if(!users.length) return 

        const productsSeparatedByUsers = []
        getProducts().then(() => setProducts(productsSeparatedByUsers))
        console.log('productsSeparatedByUsers:', productsSeparatedByUsers)
        
    }, [users])

    return (
        <div>
            <h1>Pagina Home</h1>
            
            {users.map((user, index) => (
                <div key={user.uid}>
                    <h4>Produtos atuais do {user.name}</h4>
                    
                    {products[index] && products[index].map((product) => (
                        <ProductList
                            key={product.id}
                            id={product.id}
                            formData={Object.entries(product).map((subArray) => ({ [subArray[0]]:subArray[1] }))}

                        />
                    ))}
                </div>
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
