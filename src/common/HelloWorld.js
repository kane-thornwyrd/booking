import React, { useState } from 'react'

export default () => {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <h1>Hello World {count}</h1>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </React.Fragment>
  )
}
