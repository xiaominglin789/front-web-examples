import React, { useRef } from 'react'

function ComAdd(props) {
  const inputValue = useRef()
  // 从props中获取父组件传递的事件,父子组件事件/属性传递
  const { addItem } = props

  const onAddItem = () => {
    const value = inputValue.current.value.trim()
    if (!value) return

    addItem({
      id: new Date().getTime(),
      content: value,
      complated: false
    })

    inputValue.current.value = ''
  }

  return (
    <div>
      <input ref={ inputValue } type="text" placeholder="新选项" />
      <button onClick={ onAddItem }>添加</button>
    </div>
  )
}

export default ComAdd
