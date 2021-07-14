import React, { useEffect, useState } from 'react'
import { database, auth } from '../../services/firebase'
import './styles.css'

export function Product(props) {

    const [formData, setFormData] = useState([{id: props.id}])

    const [attribute, setAttribute] = useState('')
    const [value, setValue] = useState('')

    function handleChangeData(index, event, type) {
        event.preventDefault();

        if (index === formData.length - 1) {
            if(type) {
                setValue(event.target.value)
            } else {
                setAttribute(event.target.value)
            }
        } else {
            const updatedFormData = formData.map((data, _index) => {
                if (index === _index - 1) {
                    let objArray = Object.entries(data)[0]
                    objArray[type] = event.target.value

                    return {[objArray[0]] : objArray[1]}
                } else {
                    return data
                }
            }) 
            setFormData(updatedFormData)
        }
    }

    function handleAddData(event) {
        event.preventDefault()
        const inputState = {
          [attribute]: value
        }
        setFormData((prev) => [...prev, inputState]);
    }

    function handleSaveData(event) {
        event.preventDefault()
        const user = auth.currentUser;
        const { uid } = user

        const productsDataObject = formData.reduce((acc, obj) => ({...acc, ...obj}), {})

        database.collection("userProducts").doc(uid).collection("products").doc(props.id).set(productsDataObject)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
    }

    return (
        <div className="Container">
            <form>
                <h3>Produto: {props.id}</h3>
                <div className="rowContainer">
                    <div>
                        {formData.map((item, index) => (
                            <div key={`${index}`} className="rowContent">
                                <input
                                    type="text"
                                    name="Attribute"
                                    placeholder="Atributo"
                                    value={item.Attribute}
                                    onChange={(event) => handleChangeData(index, event, 0)}
                                />

                                <input
                                    type="text"
                                    name="Value"
                                    placeholder="Value"
                                    value={item.Value}
                                    onChange={(event) => handleChangeData(index, event, 1)}
                                />
                            </div>
                        ))}
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
