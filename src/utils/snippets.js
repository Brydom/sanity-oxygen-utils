import { json } from "@shopify/remix-oxygen";

/**
 * Returns an object containing keys for the root loader meant to be spread into the root loader return.
 * @param {Object} context - The context object.
 * @param {Object} context.env - The environment object.
 * @returns {Object} - An object containing keys for the root loader.
 */
export function getRootLoaderKeys(context) {
  return {
    SANITY_PREVIEW:
      context.env.NODE_ENV === "production"
        ? false
        : ["true", true].includes(preview) || false,
    ALLOW_DATASET_SWAP:
      context.env.NODE_ENV === "production"
        ? false
        : context.env.ALLOW_DATASET_SWAP,
  };
}

/**
 * Handles dataset and preview changes. Set this route up at `/api/dataset`.
 * @param {Object} options - The options object.
 * @param {Object} options.request - The request object.
 * @param {Object} options.context - The context object.
 * @returns {Object} - A JSON response object.
 *
 * @example
 * ```js
 * import { createApiRoute } from "sanity-oxygen-utils";
 *
 * export default createApiRoute;
 * ```
 */
export async function createApiRoute({ request, context }) {
  const formData = await request.formData();
  const formAction = formData.get("action");
  if (formAction === "dataset") {
    const dataset = formData.get("dataset");

    if (dataset) {
      await context.session.set("dataset", dataset);
    }

    return json(
      {},
      {
        headers: {
          "Set-Cookie": await context.session.commit(),
        },
      }
    );
  }
  const preview = formData.get("preview");
  await context.session.set("preview", preview);
  return json(
    {},
    {
      headers: {
        "Set-Cookie": await context.session.commit(),
      },
    }
  );
}
