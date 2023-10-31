import {LiveQueryProvider} from '@sanity/preview-kit';
import {useRouteLoaderData} from '@remix-run/react';
import {Suspense, useMemo} from 'react';
import {createClient} from '@sanity/client';
import DatasetSelector from './DatasetSelector.jsx';

/**
 * Provides a live query client for Sanity CMS preview.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered.
 * @param {string} [props.apiVersion="2023-06-20"] - The version of the Sanity API to use.
 * @returns {ReactNode} - The rendered child components wrapped in a LiveQueryProvider.
 */
function PreviewProviderInner({children, apiVersion = '2023-06-20'}) {
  const {SANITY} = useRouteLoaderData('root');

  const client = useMemo(
    () =>
      createClient({
        projectId: SANITY.PROJECT_ID,
        dataset: SANITY.DATASET,
        apiVersion,
        useCdn: false,
        token: SANITY.TOKEN,
        ignoreBrowserTokenWarning: true,
      }),
    [SANITY.PROJECT_ID, SANITY.DATASET, SANITY.TOKEN],
  );

  return (
    <LiveQueryProvider client={client} logger={console}>
      {children}
    </LiveQueryProvider>
  );
}

export default function PreviewProvider({datasets, children, ...props}) {
  const {SANITY} = useRouteLoaderData('root');

  if (!SANITY.PREVIEW) {
    return (
      <>
        <DatasetSelector datasets={datasets} />
        {children}
      </>
    );
  }

  return (
    <>
      <DatasetSelector datasets={datasets} />
      <Suspense fallback={children}>
        <PreviewProviderInner {...props}>{children}</PreviewProviderInner>
      </Suspense>
    </>
  );
}
