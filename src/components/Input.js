import React from 'react'

const Input = ({className, type, placeholder, onChange}) => {
  return (
    <input onChange={onChange} className={className} type={type} placeholder={placeholder}/>
  )
}

export default Input