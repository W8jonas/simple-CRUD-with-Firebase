import React, { useEffect, useState } from 'react'
import { database, auth } from '../../services/firebase'
import './styles.css'

export function Product({id: productId}) {

    const [formData, setFormData] = useState([{id: productId}])

    function handleChangeData(index, event, type) {
        event.preventDefault();
        const updatedFormData = formData.map((data, _index) => {
            if (index === _index) {
                let objArray = Object.entries(data)[0]
                objArray[type] = event.target.value

                return {[objArray[0]] : objArray[1]}
            } else {
                return data
            }
        }) 
        setFormData(updatedFormData)

    }

    function handleAddData(event) {
        event.preventDefault()

        setFormData((prev) => [...prev, {'': ''}]);
    }

    function handleSaveData(event) {
        event.preventDefault()
        const user = auth.currentUser;
        const { uid } = user

        const productsDataObject = formData.reduce((acc, obj) => ({...acc, ...obj}), {})

        database.collection("userProducts").doc(uid).collection("products").doc(productId).set(productsDataObject)
            .then((docRef) => {
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
            .doc(productId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setFormData(Object.entries(doc.data()).map((subArray) => ({ [subArray[0]]:subArray[1] })))
                } else {
                    console.log("Não foi encontrado nada.");
                }
            })
    }, [productId])

    return (
        <div className="Container">
            <form>
                <h3>Id do produto: {productId}</h3>
                <div className="rowContainer">
                    <div>
                        {formData.map((item, index) => {
                            return Object.entries(item)[0][0] !== "id" 
                            ? (
                                <div key={`${index}`} className="rowContent">
                                    <input
                                        type="text"
                                        name="Attribute"
                                        placeholder="Atributo"
                                        value={Object.entries(item)[0][0]}
                                        onChange={(event) => handleChangeData(index, event, 0)}
                                    />

                                    <input
                                        type="text"
                                        name="Value"
                                        placeholder="Value"
                                        value={Object.entries(item)[0][1]}
                                        onChange={(event) => handleChangeData(index, event, 1)}
                                    />
                                </div>
                            )
                            : null
                    })}
                    </div>

                    <button
                        className="button" 
                        onClick={handleSaveData}
                    >
                        Salvar
                    </button>
                </div>

                <button
                    className="button" 
                    onClick={handleAddData}
                >
                    Adicionar nova propriedade
                </button>
            </form>
        </div>
    )
}
