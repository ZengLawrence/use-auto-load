import React from 'react'

import { useMyHook } from 'use-auto-load'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
