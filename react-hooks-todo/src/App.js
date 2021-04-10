import React, { useState, useCallback } from 'react'
import ComAdd from './component/ComAdd'
import ComList from './component/ComList'

function App() {
  const [todoList, setTodoList]  = useState([])

  const onAddItem = useCallback((newItem) => {
    setTodoList(todoList => [newItem, ...todoList])
  }, [])

  const onRemoveItem = useCallback((id) => {
    setTodoList(todoList => {
      return todoList.filter(item => item.id !== id)
    })
  }, [])

  const onSetComplated = useCallback((id) => {
    setTodoList(todoList => {
      return todoList.map(item => {
        if (item.id === id) {
          item.complated = !item.complated
        }
        return item
      })
    })
  }, [])

  return (
    <div className="App">
      <ComAdd addItem={ onAddItem } />
      <ComList
        list={ todoList }
        removeItem={ onRemoveItem }
        setComplated={onSetComplated }
      />
    </div>
  );
}

export default App;
