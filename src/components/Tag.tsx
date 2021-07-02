import React, { LiHTMLAttributes, useEffect, useState } from 'react'

export function Tag({ ...props }) {
  const { state, setState } = props
  const [clicked, setClicked] = useState(false)
  const [tag] = useState<Tag>(props.tag)
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    !clicked ? setClicked(true) : setClicked(false)
  }
  useEffect(() => {
    setState({ ...state, [tag.id]: clicked })
  }, [clicked])
  return (
    <li
      {...props}
      className={clicked ? 'outlined list-tags' : 'list-tags'}
      onClick={(e) => handleClick(e)}>
      {tag.name}
    </li>
  )
}
