# Sanity & Oxygen (Remix) Utilities

Easily set up preview and dataset swap functionalities on your frontend for development and testing purposes.

## Installation

### Set up `sanity-oxygen-utils` in your `root.jsx`

1. Import the `getRootLoaderKeys` and `PreviewProvider` components
2. Add the `getRootLoaderKeys` to your `loader` function
3. Wrap your `Root` return with the `PreviewProvider` component

```jsx
// app/root.jsx

import { getRootLoaderKeys, PreviewProvider } from 'sanity-oxygen-utils';

...

export function loader({ context }) {
  ...

  return {
    myData,
    ...(await getRootLoaderKeys(context)),
  }
}

export function Root({ app }) {
  ...
  const children = (
    ...other providers
    <Outlet />
  )

  return (
    <PreviewProvider
      datasets={[
        {
          label: 'development',
          value: 'development',
        },
        {
          label: 'production',
          value: 'production',
        },
      ]}
    >
      <Outlet />
      ...other
    </PreviewProvider>
  )
}
```

### Create the endpoint required to manage the preview and dataset swap at /api/sanity-remix-utils

```js
// app/routes/*/api.sanity-remix-utils.js
import { createApiRoute } from "../../src";

export function action({ request, context }) {
  return createApiRoute({ request, context });
}
```

## Usage

1. When fetching Sanity content in your loaders, make sure to use the `sanityClient` from `sanity-oxygen-utils` and the `useLiveQuery` hook:

```js
import { sanityClient } from 'sanity-oxygen-utils';
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
