import React from 'react'
import axios from 'axios'

import { type DeployPayload } from 'utils/types.js'

const Button: React.FC<DeployPayload> = (props) => {
  const onClick = async () => {
    await axios.post('http://localhost/foo', props)
  }

  return (
    <button onClick={onClick} aria-label="deploy-button">
      Deploy
    </button>
  )
}

export default Button
