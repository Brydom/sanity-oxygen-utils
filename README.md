# Sanity & Oxygen (Remix) Utilities

Easily set up preview and dataset swap functionalities on your frontend for development and testing purposes.

## Installation

1. Set up `sanity-remix-utils` in your `root.jsx` file:
1. Import the `getRootLoaderKeys` and `PreviewProvider` components
1. Add the `getRootLoaderKeys` to your `loader` function
1. Wrap your `Root` return with the `PreviewProvider` component

```jsx
// app/root.jsx

import { getRootLoaderKeys, PreviewProvider } from 'sanity-remix-utils';

...

export function loader({ context }) {
  ...

  return {
    ...
    ...getRootLoaderKeys({ context }),
  }
}

export function Root({ app }) {
  ...
  const children = (
    ...other providers
    <Outlet />
  )

  return (
    <PreviewProvider>
      <...OtherProviders>
        <Outlet />
      </...OtherProviders>
    </PreviewProvider>
  )
}
```

2. Create the endpoint required to manage the preview and dataset swap in your `api` folder:

```js
// app/routes/*/api/dataset.js
import { createApiRoute } from "sanity-remix-utils";

export default createApiRoute();
```

## Usage

1. When fetching Sanity content in your loaders, make sure to use the `sanityClient` from `sanity-remix-utils` and the `useLiveQuery` hook:

```js
import { sanityClient } from 'sanity-remix-utils';
import { useLoaderData } from '@remix-run/react';

const SANITY_QUERY = `*[id]`;

export function loader({ context }) {
  ...
  const sanityData = await sanityClient(context).fetch(SANITY_QUERY);

  return {
    sanityData,
  }
}

export function myComponent() {
  const { sanityData: _sanityData } = useLoaderData();

  const [sanityData] = useLiveQuery(_sanityData, SANITY_QUERY);

  console.log(sanityData); // done!
}
```
