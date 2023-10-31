import {sanityClient} from '../sanity-remix-utils';
import {useLoaderData} from '@remix-run/react';
import {useLiveQuery} from '@sanity/preview-kit';

const SANITY_QUERY = `*{_id}[0...5]`;

export async function loader({context}) {
  const sanityData = await sanityClient(context).fetch(SANITY_QUERY);

  return {
    sanityData,
  };
}

export default function Index() {
  const {sanityData: _sanityData} = useLoaderData();

  const [sanityData] = useLiveQuery(_sanityData, SANITY_QUERY);

  return (
    <>
      <h2>Sanity Content</h2>
      <code>{JSON.stringify(sanityData)}</code>
    </>
  );
}
