import { screen, act } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import DeployButton from './DeployButton.js'
import { DeployPayload } from 'utils/api.js'
import { checkRequestPayload, render, server } from 'utils/testUtils.js'

const onClose = vi.fn((_update: boolean) => null)

beforeAll(() => {
  server.listen()
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers()
})

// Clean up after the tests are finished.
afterAll(() => {
  server.close()
})

describe('The Deploy Button', () => {
  const expectedPayload: DeployPayload = {
    foo: 'foo',
    name: 'foo',
  }
  it('synch', async () => {
    server.use(
      http.post<never, DeployPayload>('http://localhost/foo', () => {
        return new HttpResponse(null, { status: 204 })
      })
    )
    render(<DeployButton {...expectedPayload} onClose={onClose} />)
    // Establish a request listener but don't resolve it yet.
    const validatePayload = checkRequestPayload('POST', 'http://localhost/foo', expectedPayload)

    const button = screen.getByLabelText('deploy-button')
    await act(async () => await button.click())

    // Await the request, get its reference, and check content to match what expected
    const payloadMatches = await validatePayload
    expect(payloadMatches).toBeTruthy()

    expect(await screen.findByText('Deployment Succesful')).toBeInTheDocument()
    expect(onClose).toHaveBeenLastCalledWith(true)
  })

  it('async', async () => {
    server.use(
      http.post<never, DeployPayload>('http://localhost/foo', async ({ request }) => {
        const body = await request.json()
        if (body.name === 'bar') {
          return new HttpResponse(null, { status: 400 })
        }
        return new HttpResponse(null, { status: 204 })
      })
    )
    render(<DeployButton {...expectedPayload} onClose={onClose} />)
    // Establish a request listener but don't resolve it yet.
    const validatePayload = checkRequestPayload('POST', 'http://localhost/foo', expectedPayload)

    const button = screen.getByLabelText('deploy-button')
    await act(async () => await button.click())

    // Await the request, get its reference, and check content to match what expected
    const payloadMatches = await validatePayload
    expect(payloadMatches).toBeTruthy()

    expect(await screen.findByText('Deployment Succesful')).toBeInTheDocument()
    expect(onClose).toHaveBeenLastCalledWith(true)
  })
})
