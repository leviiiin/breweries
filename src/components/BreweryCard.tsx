/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useBreweriesStore } from '@/stores/breweriesStore';
import { Brewery } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  brewery: Brewery;
}

export const BreweryCard: React.FC<Props> = ({ brewery }) => {
  const { selectBrewery, selectedIds } = useBreweriesStore();
  const isSelected = selectedIds.includes(brewery.id);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    selectBrewery(brewery.id);
  };

  const handleSelectButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    selectBrewery(brewery.id);
  };

  return (
    <Link href={`/brewery/${brewery.id}`} className="block relative">
      <div
        className={`p-4 bg-white rounded-lg shadow-md cursor-pointer border-2 hover:shadow-lg transition-shadow ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
        onContextMenu={handleRightClick}
      >
        <h3 className="font-bold text-lg mb-1">{brewery.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{brewery.brewery_type}</p>
        {brewery.city && <p className="text-sm">{brewery.city}, {brewery.state}</p>}

        {isTouchDevice && (
          <button
            onClick={handleSelectButton}
            className={`absolute top-2 right-2 px-2 py-1 text-xs rounded text-white ${isSelected ? 'bg-blue-500' : 'bg-neutral-400'}`}
          >
            {isSelected ? '✓' : '+'}
          </button>
        )}
      </div>
    </Link>
  );
};
