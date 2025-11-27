'use client';

import dynamic from "next/dynamic";

const BreweryMap = dynamic(() => import('@/components/BreweryMap'), {
  ssr: false,
});

export default BreweryMap;