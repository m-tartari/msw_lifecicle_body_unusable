import React from 'react'
import ReactDOM from 'react-dom/client'

import Button from 'components/DeployButton.js'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Button name={'foo'} foo={'bar'} />
  </React.StrictMode>
)
