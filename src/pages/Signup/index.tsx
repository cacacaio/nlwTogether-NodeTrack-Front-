import React from 'react'
import { useAuth } from '../../hooks/useAuth'

export function Signup() {
  const { user } = useAuth()
  React.useEffect(() => {
    console.log(user)
  })
  return (
    <div>
      <h1>Signup</h1>
    </div>
  )
}
