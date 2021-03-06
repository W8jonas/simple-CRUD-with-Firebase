import React from 'react'
import './styles.css'

export function ProductList({id: productId, formData}) {

    return (
        <div className="container-product-list">
            <h3>Id do produto: {productId}</h3>
            <div>
                {formData.map((item, index) => {
                    return Object.entries(item)[0][0] !== "id" 
                    ? (
                        <div key={`${index}`} className="row-container-product-list">
                            <p>{Object.entries(item)[0][0]}: </p>
                            <p>{Object.entries(item)[0][1]}</p>
                        </div>
                    )
                    : null
                })}
            </div>
        </div>
    )
}
