import './style.scss'

import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Tag } from '../../components/Tag'
import api from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import { useEffect } from 'react'

export function Tags() {
  const [gitImg, setGitImg] = useState(
    'https://avatars.githubusercontent.com/u/77732738?v=4'
  )
  const [compliments, setCompliments] = useState([])
  const [tags, setTags] = useState<Tag[]>()
  const [selected, setSelect] = useState<{ [key: string]: true }>({})
  const [receiver, setReceiver] = useState<string>('')
  const { user } = useAuth()
  useEffect(() => {
    let usuario = user?.email?.split('@')[0]
    const getGithubPic = async () => {
      let {
        data: { items },
      } = await axios.get(`https://api.github.com/search/users?q=${usuario}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GIT_API}`,
        },
      })
      let [img] = items
      if (img) setGitImg(img.avatar_url)
    }
    const getCompliments = async () => {
      let { data } = await api.get('/compliments/received')
      setCompliments(data)
    }
    const getTags = async () => {
      let { data }: { data: Tag[] } = await api.get('/tags')
      setTags(data)
    }
    getCompliments()
    getGithubPic()
    getTags()
  }, [])
  const handleCompliment = async () => {
    Object.entries(selected).map(async (data) => {
      if (data[1]) {
        var res: AxiosError = await api.post('/compliments', {
          user_receiver: receiver,
          tag_id: data[0],
          message: '',
        })
        res.response?.status != 400
          ? alert('Usuario Elogiado com Sucesso!')
          : alert('Usuario Não Encontrado')
      }
    })
  }
  document.addEventListener(
    'mousedown',
    function (event) {
      if (event.detail > 1) {
        event.preventDefault()
      }
    },
    false
  )
  return (
    <div className="main-tags">
      <div className="left">
        <div className="profile">
          <img src={gitImg} alt="GitHub Profile"></img>
          <h1>{user?.name}</h1>
        </div>
        <ul className="list-compliments">
          {compliments.length > 0 &&
            compliments.map(({ tag }: { tag: Tag }) => <li>{tag.name}</li>)}
        </ul>
      </div>
      <div className="right">
        <h2>E-mail da pessoa elogiada</h2>
        <Input onChange={(e) => setReceiver(e.target.value)} value={receiver} />
        <br />
        <ul>
          {tags ? (
            tags.map((tag) => {
              return (
                <Tag
                  key={tag.id}
                  tag={tag}
                  state={selected}
                  setState={setSelect}
                />
              )
            })
          ) : (
            <li>Sem Tags</li>
          )}
        </ul>
        <Button
          style={{ backgroundColor: '#6F7AD8' }}
          onClick={handleCompliment}>
          Elogiar
        </Button>
      </div>
    </div>
  )
}
