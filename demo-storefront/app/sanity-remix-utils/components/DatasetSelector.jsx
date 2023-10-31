import {useRouteLoaderData, useFetcher} from '@remix-run/react';
import {useEffect, useRef} from 'react';
import {
  DatasetSelectorContainer,
  DatasetSelectorDraftsButton,
  DatasetSelectorTitle,
  DatasetSelectorDatasetDropdown,
} from '../styles';

/**
 * A component that allows the user to select a dataset and toggle preview mode.
 * @param {Object} props - The props object.
 * @param {Array} props.datasets - An array of objects representing the available datasets. Each object should have a `value` and a `label` property.
 * @returns {JSX.Element} - A JSX element representing the dataset selector.
 */
function DatasetSelectorInner({datasets}) {
  const {SANITY} = useRouteLoaderData('root');
  const {DATASET, PREVIEW} = SANITY;

  const fetcher = useFetcher();

  const handleUpdate = async (e) => {
    const newDataset = e.target.value;
    fetcher.submit(
      {action: 'dataset', dataset: newDataset},
      {method: 'POST', action: '/api/sanity-remix-utils'},
    );
  };

  const handlePreviewUpdate = async () => {
    fetcher.submit(
      {action: 'preview', preview: !PREVIEW},
      {method: 'POST', action: '/api/sanity-remix-utils'},
    );
  };

  const initialDataset = useRef(DATASET);

  useEffect(() => {
    if (DATASET !== initialDataset.current) window.location.reload();
  }, [DATASET]);

  if (!datasets)
    return console.error('No datasets provided to DatasetSelector');

  return (
    <DatasetSelectorContainer>
      <DatasetSelectorTitle>
        <p>Sanity</p>
      </DatasetSelectorTitle>
      <DatasetSelectorDraftsButton
        type="button"
        onClick={handlePreviewUpdate}
        className="flex h-10 items-center justify-center border-l border-black px-2"
      >
        {PREVIEW ? 'View drafts: On' : 'View drafts: Off'}
      </DatasetSelectorDraftsButton>
      <DatasetSelectorDatasetDropdown
        value={DATASET}
        onChange={handleUpdate}
        className="border-0 border-l"
      >
        {datasets.map((dataset) => (
          <option key={dataset.value} value={dataset.value}>
            {dataset.label}
          </option>
        ))}
      </DatasetSelectorDatasetDropdown>
    </DatasetSelectorContainer>
  );
}

export default function DatasetSelector(props) {
  const {SANITY} = useRouteLoaderData('root');

  if (!SANITY.ALLOW_DATASET_SWAP) return null;

  return <DatasetSelectorInner {...props} />;
}
