import React from 'react'

import './styles.css'

export function Input({name, label, ...rest}) {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input id={name} type="text" {...rest} />
        </div>
    )
}
