'use client';

import { useEffect } from 'react';
import { useBreweriesStore } from '@/stores/breweriesStore';
import { BreweryCard } from '@/components/BreweryCard';

export default function Home() {
  const {
    chunk,
    batchIndex,
    batchSize,
    loadNextChunk,
    setBatchIndex,
    selectedIds,
    deleteSelected,
  } = useBreweriesStore();

  useEffect(() => {
    if (chunk.length === 0) {
      loadNextChunk();
    }
  }, [chunk.length, loadNextChunk]);

  const start = batchIndex * batchSize;
  const end = start + batchSize;
  const visible = chunk.slice(start, end);

  const handleNext = async () => {
    const nextIndex = batchIndex + 1;

    if (nextIndex * batchSize >= chunk.length) {
      await loadNextChunk();
    }

    setBatchIndex(nextIndex);
  };

  const handlePrev = () => {
    if (batchIndex > 0) {
      setBatchIndex(batchIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Breweries</h1>

      <div className="max-w-3xl mx-auto grid gap-4">
        {visible.map((b) => (
          <BreweryCard key={b.id} brewery={b} />
        ))}
      </div>

      <div className="flex justify-between max-w-3xl mx-auto mt-4">
        <button
          onClick={handlePrev}
          disabled={batchIndex === 0}
          className="px-6 py-2 bg-neutral-300 rounded disabled:opacity-50 cursor-pointer hover:bg-neutral-400 duration-200"
        >
          Prev
        </button>

        {selectedIds.length > 0 && (
          <div className="bottom-6 right-6">
            <button
              onClick={deleteSelected}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded duration-200 cursor-pointer"
            >
              Delete {selectedIds.length}
            </button>
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={false}
          className="px-6 py-2 bg-neutral-300 rounded disabled:opacity-50 cursor-pointer hover:bg-neutral-400 duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
