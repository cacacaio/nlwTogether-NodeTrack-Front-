import './style.scss'

import React, { useState } from 'react'

import api from '../../services/api'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import { useEffect } from 'react'

const teste = 'casodoqpwkoeqkwoekqw'
export function Tags() {
  const [gitImg, setGitImg] = useState(
    'https://avatars.githubusercontent.com/u/77732738?v=4'
  )
  const [compliments, setCompliments] = useState([])
  const { user } = useAuth()
  useEffect(() => {
    const getGithubPic = async () => {
      let {
        data: { items },
      } = await axios.get(`https://api.github.com/search/users?q=${teste}`, {
        headers: {
          Authorization: 'Bearer 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',
        },
      })
      let [img] = items
      if (img) setGitImg(img.avatar_url)
    }
    const getCompliments = async () => {
      let { data } = await api.get('/compliments/received')
      setCompliments(data)
    }
    getCompliments()
    getGithubPic()
  }, [])

  return (
    <div className="main-tags">
      <div className="left">
        <img
          src={gitImg}
          alt="GitHub Profile"
          style={{
            borderRadius: '50%',
            width: '150px',
            height: '150px',
            marginBottom: '30px',
          }}></img>
        <h1>{user?.name}</h1>
        {compliments.length > 0 &&
          compliments.map(({ tag }: { tag: Tag }) => <p>{tag.name}</p>)}
      </div>
      <div className="right"></div>
    </div>
  )
}
