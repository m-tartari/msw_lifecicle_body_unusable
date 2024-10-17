# MSW: `TypeError: Body is unusable` on request inspection using Life-cycle events

This repo contains test code for mswjs/msw#2319

> [!IMPORTANT]
> Explanation of the behavior and fix are described in https://github.com/mswjs/msw/issues/2319#issuecomment-2419310755

It's simple a button that, once clicked, sends a couple of custom props to a back-end with a rest api call. It has a suite of 2 identical tests (they only differ by having sync or async mock handler). Currently one is passing and one failing with a `TypeError: Body is unusable` when accessing the request payload using Life-Cycle events (in [src/utils/testUtils.ts#L29](./src/utils/testUtils.ts#L29)). I would expect the same behavior for both.

For reproduction `npm ci && npm run test` will trigger the error.
