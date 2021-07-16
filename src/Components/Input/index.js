import React, { useRef, useEffect } from 'react'
import { useField } from '@unform/core'

import './styles.css'

export function Input({ name, label, ...rest }) {
    const inputRef = useRef(null)
    const { fieldName, defaultValue, registerField, error } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])

    return (
        <div className="input-block">

            <label htmlFor={fieldName}>{label}</label>

            <input
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultValue}
                className={error ? 'has-error' : 'normal'}
                {...rest}
            />

            {error && <span className="error">{error}</span>}
        </div>
    )
}

