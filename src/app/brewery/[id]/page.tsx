/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Brewery } from '@/types';
import BreweryMap from './MapWrapper';


interface Props {
  params: Promise<{ id: string }>;
}

export default async function BreweryPage({ params }: Props) {
  const { id } = await params;

  let brewery: Brewery | null = null;

  try {
    const res = await fetch(
      `https://api.openbrewerydb.org/v1/breweries/${id}`,
      { cache: 'no-store', next: { revalidate: 0 } }
    );

    if (!res.ok) throw new Error();

    brewery = await res.json();
  } catch {
    notFound();
  }

  if (!brewery) notFound();

  const parseCoord = (value: any): number | null => {
    if (!value) return null;
    const n = Number(value);
    return isNaN(n) ? null : n;
  };

  const latitude = parseCoord(brewery.latitude);
  const longitude = parseCoord(brewery.longitude);

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="mt-4 inline-block pt-2 pb-2.5 px-10 rounded text-white bg-blue-500 hover:bg-blue-600 font-medium"
        >
          Back to list
        </Link>

        <h1 className="text-3xl font-bold mb-4 mt-6">{brewery.name}</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <p className="mb-2">
            <strong>Type:</strong> {brewery.brewery_type}
          </p>

          {brewery.street && (
            <p className="mb-2">
              <strong>Address:</strong> {brewery.street}
            </p>
          )}

          {brewery.city && (
            <p className="mb-2">
              <strong>Location:</strong> {brewery.city}, {brewery.state} {brewery.postal_code}
            </p>
          )}

          {brewery.country && (
            <p className="mb-2">
              <strong>Country:</strong> {brewery.country}
            </p>
          )}

          {brewery.phone && (
            <p className="mb-2">
              <strong>Phone:</strong> {brewery.phone}
            </p>
          )}

          {brewery.website_url && (
            <p className="mb-2">
              <strong className='mr-2'>Website:</strong>
              <a
                href={brewery.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                {brewery.website_url}
              </a>
            </p>
          )}
        </div>


        <div className="mb-6">
          {latitude && longitude ? (
            <BreweryMap latitude={latitude} longitude={longitude} name={brewery.name} />
          ) : (
            <p className="text-red-500">No coordinates available for this brewery.</p>
          )}
        </div>
      </div>
    </div>
  );
}
