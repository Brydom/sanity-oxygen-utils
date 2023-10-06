import { LiveQueryProvider } from "@sanity/preview-kit";
import { useRouteLoaderData } from "@remix-run/react";
import { Suspense, useMemo } from "react";
import { createClient } from "@sanity/client";

/**
 * Provides a live query client for Sanity CMS preview.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered.
 * @param {string} [props.apiVersion="2023-06-20"] - The version of the Sanity API to use.
 * @returns {ReactNode} - The rendered child components wrapped in a LiveQueryProvider.
 */
function PreviewProviderInner({ children, apiVersion = "2023-06-20" }) {
  const { ENV: { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN } = {} } =
    useRouteLoaderData("root");

  const client = useMemo(
    () =>
      createClient({
        projectId: SANITY_PROJECT_ID,
        dataset: SANITY_DATASET,
        apiVersion,
        useCdn: false,
        token: SANITY_TOKEN,
        ignoreBrowserTokenWarning: true,
      }),
    [SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN]
  );

  return (
    <LiveQueryProvider client={client} logger={console}>
      {children}
    </LiveQueryProvider>
  );
}

export default function PreviewProvider({ sanityPreview, children, ...props }) {
  if (!sanityPreview) return children;

  return (
    <Suspense fallback={children}>
      <PreviewProviderInner {...props}>{children}</PreviewProviderInner>
    </Suspense>
  );
}
