import React from 'react'
import './styles.css'

export function ProductList({id: productId, formData}) {
    return (
        <div className="Container">
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
                                />

                                <input
                                    type="text"
                                    name="Value"
                                    placeholder="Value"
                                    value={Object.entries(item)[0][1]}
                                />
                            </div>
                        )
                        : null
                    })}
                </div>

            </div>
        </div>
    )
}
