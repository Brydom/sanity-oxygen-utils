// app/routes/*/api/sanity-oxygen-utils.js
import {createApiRoute} from '~/sanity-oxygen-utils';

export function action({request, context}) {
  return createApiRoute({request, context});
}
