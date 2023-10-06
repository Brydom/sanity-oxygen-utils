import { useRouteLoaderData, useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";

/**
 * A component that allows the user to select a dataset and toggle preview mode.
 * @param {Object} props - The props object.
 * @param {Array} props.datasets - An array of objects representing the available datasets. Each object should have a `value` and a `label` property.
 * @returns {JSX.Element} - A JSX element representing the dataset selector.
 */
function DatasetSelectorInner({ datasets }) {
  const {
    ENV: { SANITY_DATASET, SANITY_PREVIEW },
  } = useRouteLoaderData("root");
  const fetcher = useFetcher();

  const handleUpdate = async (e) => {
    const newDataset = e.target.value;
    fetcher.submit(
      { action: "dataset", dataset: newDataset },
      { method: "POST", action: "/api/dataset" }
    );
  };

  const handlePreviewUpdate = async () => {
    fetcher.submit(
      { action: "preview", preview: !SANITY_PREVIEW },
      { method: "POST", action: "/api/dataset" }
    );
  };

  const initialDataset = useRef(SANITY_DATASET);

  useEffect(() => {
    if (SANITY_DATASET !== initialDataset.current) window.location.reload();
  }, [SANITY_DATASET]);

  if (!datasets)
    return console.error("No datasets provided to DatasetSelector");

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-stretch border border-solid border-black bg-white opacity-20 hover:opacity-100">
      <div className="flex items-center bg-black px-2 text-white">
        <p>Sanity</p>
      </div>
      <button
        type="button"
        onClick={handlePreviewUpdate}
        className="flex h-10 items-center justify-center border-l border-black px-2"
      >
        {SANITY_PREVIEW ? "View drafts: On" : "View drafts: Off"}
      </button>
      <select
        value={SANITY_DATASET}
        onChange={handleUpdate}
        className="border-0 border-l"
      >
        {datasets.map((dataset) => (
          <option key={dataset.value} value={dataset.value}>
            {dataset.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function DatasetSelector(props) {
  const { ALLOW_DATASET_SWAP } = useRouteLoaderData("root");

  if (!ALLOW_DATASET_SWAP) return null;

  return <DatasetSelectorInner {...props} />;
}
