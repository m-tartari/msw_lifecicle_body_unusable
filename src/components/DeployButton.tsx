import React from 'react'
import { Backdrop, Button, CircularProgress } from '@mui/material'

import { useDeployModel, type DeployPayload } from 'utils/api.js'

const DeployButton: React.FC<DeployPayload & { onClose: (b: boolean) => void }> = ({
  onClose,
  ...props
}) => {
  const requestDeploy = useDeployModel()
  const onClick = () => requestDeploy.mutate(props, { onSuccess: () => onClose(true) })

  if (requestDeploy.isPending) {
    return (
      <Backdrop open={true} aria-label="loading-screen">
        <CircularProgress />
      </Backdrop>
    )
  }

  return (
    <Button onClick={onClick} aria-label="deploy-button">
      Deploy
    </Button>
  )
}

export default DeployButton
