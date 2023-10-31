// app/routes/*/api/sanity-remix-utils.js
import {createApiRoute} from '~/sanity-remix-utils';

export function action({request, context}) {
  return createApiRoute({request, context});
}
