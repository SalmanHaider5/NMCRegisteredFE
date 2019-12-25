import React from 'react'
import './custom-components.css'

export const TextField = ({ 
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <div className="text-field">
      <input {...input} className="text-field" placeholder={label} type={type} />
      <span>{touched && error ? '* '+error : ''}</span>
    </div>
  </div>
)