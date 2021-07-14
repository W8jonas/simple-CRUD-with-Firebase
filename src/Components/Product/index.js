import React, { useEffect, useState } from 'react'
import './styles.css'

export function Product(props) {

    const [formData, setFormData] = useState([{id: Math.random()}])

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

    return (
        <div className="Container">
            <h3>Produto: {props.id}</h3>
            <form>
                {formData.map((item, index) => (
                    <div 
                        className="rowContainer" 
                        key={`${index}`}
                    >
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
