'use client';

import { create } from 'zustand';
import { Brewery } from '@/types';

interface Store {
  chunk: Brewery[];
  batchIndex: number;
  batchSize: number;
  currentPage: number;
  selectedIds: string[];

  loadNextChunk: () => Promise<void>;
  setBatchIndex: (i: number) => void;
  selectBrewery: (id: string) => void;
  deleteSelected: () => void;
}

export const useBreweriesStore = create<Store>((set, get) => ({
  chunk: [],
  batchIndex: 0,
  batchSize: 5,
  currentPage: 1,
  selectedIds: [],

  loadNextChunk: async () => {
    const { currentPage, chunk } = get();
    try {
      const res = await fetch(
        `https://api.openbrewerydb.org/v1/breweries?per_page=15&page=${currentPage}`,
        { cache: 'no-store' }
      );
      const data: Brewery[] = await res.json();

      set({
        chunk: [...chunk, ...data],
        currentPage: currentPage + 1,
      });
    } catch (error) {
      console.error('Error loading breweries:', error);
    }
  },

  setBatchIndex: (i) => {
    const { chunk, batchSize } = get();
    const maxBatch = Math.floor((chunk.length - 1) / batchSize);
    const newIndex = Math.max(0, Math.min(i, maxBatch));
    set({ batchIndex: newIndex });
  },

  selectBrewery: (id) => {
    const { selectedIds } = get();
    set({
      selectedIds: selectedIds.includes(id)
        ? selectedIds.filter(sid => sid !== id)
        : [...selectedIds, id],
    });
  },

  deleteSelected: () => {
    const { selectedIds, chunk, batchIndex, batchSize, loadNextChunk } = get();
    if (selectedIds.length === 0) return;

    const remaining = chunk.filter(b => !selectedIds.includes(b.id));

    const maxBatchIndex = Math.floor((remaining.length - 1) / batchSize);
    const newBatchIndex = Math.min(batchIndex, maxBatchIndex >= 0 ? maxBatchIndex : 0);

    set({
      chunk: remaining,
      selectedIds: [],
      batchIndex: newBatchIndex,
    });

    if ((newBatchIndex + 1) * batchSize > remaining.length) {
      loadNextChunk();
    }
  },
}));
