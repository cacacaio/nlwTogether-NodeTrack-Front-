import { useHistory } from 'react-router-dom'

export const isAuth = (): boolean => localStorage.getItem('nlw-token') !== null

export const getToken = (): string | null => localStorage.getItem('nlw-token')

export const login = (
  token: string,
  name: string,
  email: string,
  id: string
): void => {
  localStorage.setItem('nlw-token', token)
  localStorage.setItem('nlw-name', name)
  localStorage.setItem('nlw-email', email)
  localStorage.setItem('nlw-id', id)
}
export const logout = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    localStorage.removeItem('nlw-token')
    resolve()
  })
}

export const getUser = (): User => ({
  name: localStorage.getItem('nlw-name'),
  email: localStorage.getItem('nlw-email'),
  id: localStorage.getItem('nlw-id'),
})
