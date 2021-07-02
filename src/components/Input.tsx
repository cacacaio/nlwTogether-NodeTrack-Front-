import '../styles/input.scss'

import React, { InputHTMLAttributes } from 'react'

export function Input({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="input"></input>
}
