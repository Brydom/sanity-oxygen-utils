import { createClient } from "@sanity/client";

let sanityClientSingleton;

/**
 * Creates a singleton instance of the Sanity client and prepares it to be used for dataset swaps.
 * @param {Object} options - The configuration options for the client.
 * @param {Object} options.context - The context object containing environment variables and session information.
 * @param {string} [options.apiVersion="2023-05-26"] - The version of the Sanity API to use.
 * @returns {Object} - The singleton instance of the Sanity client.
 */
export default function sanityClient({ context, apiVersion = "2023-05-26" }) {
  const dataset =
    context.env.ALLOW_DATASET_SWAP === "true"
      ? context.session.session.get("dataset") || context.env.SANITY_DATASET
      : context.env.SANITY_DATASET;

  if (!sanityClientSingleton) {
    sanityClientSingleton = createClient({
      projectId: context.env.SANITY_PROJECT_ID,
      dataset,
      apiVersion,
      useCdn: context.env.NODE_ENV === "production",
      token: context.env.SANITY_TOKEN,
    });
  }

  if (sanityClientSingleton.config().dataset !== dataset) {
    sanityClientSingleton.config({ dataset });
  }

  return sanityClientSingleton;
}
