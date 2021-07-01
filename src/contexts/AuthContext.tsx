import { createContext, useEffect, useState } from 'react'

import { ReactNode } from 'react'
import { getUser } from '../services/auth'

type AuthContextType = {
  user: User | undefined
}

type PropsType = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: PropsType) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    setUser(getUser())
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  )
}
