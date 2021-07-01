import './style.scss'

import React, { FormEvent, useEffect, useState } from 'react'
import { isAuth, login } from '../../services/auth'

import { Button } from '../../components/Button'
import api from '../../services/api'
import nlwLogin from '../../assets/nlwLogin.png'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

type LoginForm = {
  email: string
  password: string
}

export function Login() {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  })
  const history = useHistory()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    const {
      data: { email, token, name, id },
    } = await api.post('/login', loginForm)
    login(token, name, email, id)
    history.push('/tags')
  }

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development')
      isAuth() && history.push('/tags')
  }, [])

  return (
    <div className="main-login">
      <div className="image-login">
        <img alt="Nlw Login" src={nlwLogin}></img>
      </div>

      <form className="login-box" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>
          {`E-Mail : `}
          <input
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({
                password: loginForm.password,
                email: e.target.value,
              })
            }
          />
        </label>
        <label htmlFor="">
          {`Senha : `}
          <input
            type="password"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ password: e.target.value, email: loginForm.email })
            }
          />
        </label>
        <Button type="submit">Logar</Button>
      </form>
    </div>
  )
}
