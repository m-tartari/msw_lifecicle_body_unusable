import axios, { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'

export type DeployPayload = {
  name: string
  foo: string
}

export function useDeployModel() {
  const { enqueueSnackbar } = useSnackbar()
  return useMutation({
    mutationFn: async (payload: DeployPayload) => {
      const { data } = await axios.post<File | undefined>('http://localhost/foo', payload)
      return data
    },
    onSuccess: () => {
      enqueueSnackbar('Deployment Succesful', { variant: 'success' })
    },
    onError: async (error: AxiosError) => {
      enqueueSnackbar(`Error: ${error.response?.status} ${error.response?.statusText}.`)
    },
  })
}
