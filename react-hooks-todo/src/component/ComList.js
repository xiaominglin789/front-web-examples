import React from 'react'

function ComList(props) {
  const { list, setComplated, removeItem } = props
  
  return (
    <div>
      {
        list.map((item,index) => {
          return (
            <div key={ index }>
              <input
                type="checkbox"
                checked={ item.complated }
                onChange={ () => setComplated(item.id) }
              />
              <span style={{textDecoration: item.complated ? 'line-through' : '', padding: '2px 8px'  }}>{ item.content }</span>
              <button onClick={ () => removeItem(item.id) }>删除</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default ComList