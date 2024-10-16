import React from 'react'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render as rtlRender } from '@testing-library/react'
import { matchRequestUrl } from 'msw'
import { setupServer } from 'msw/node'
import { isEqual } from 'lodash'

export const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
})

export const render = (ui: React.ReactElement) =>
  rtlRender(
    <QueryClientProvider client={testQueryClient}>
      <SnackbarProvider>{ui}</SnackbarProvider>
    </QueryClientProvider>
  )

export const server = setupServer()

export function checkRequestPayload<T extends object>(
  method: string,
  url: string,
  expectedPayload: T
) {
  let id = ''

  return new Promise<boolean>((resolve, reject) => {
    server.events.on('request:start', async ({ request, requestId }) => {
      const matchesMethod = request.method.toLowerCase() === method.toLowerCase()

      const requestUrl = new URL(request.url)
      const matchesUrl = matchRequestUrl(requestUrl, url).matches

      if (matchesMethod && matchesUrl) {
        id = requestId
      }
    })

    server.events.on('request:match', async ({ request, requestId }) => {
      if (requestId === id) {
        try {
          const payload: T = await request.json()
          resolve(isEqual(expectedPayload, payload))
        } catch (error) {
          console.error('Error parsing request:', error)
          reject(error)
        }
      }
    })

    server.events.on('request:unhandled', ({ request, requestId }) => {
      if (requestId === id) {
        reject(new Error(`The ${request.method} ${request.url} request was unhandled.`))
      }
    })
  })
}
