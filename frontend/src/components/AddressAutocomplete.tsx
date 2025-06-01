/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';

type GeocodeResult = {
  latitude: number;
  longitude: number;
  city: string | null;
  placeName: string;
};

type AddressAutocompleteProps = {
  /** Tokenul tău Mapbox cu permisiune de geocodare */
  mapboxToken: string;
  /** Callback apelat când utilizatorul selectează un rezultat */
  onSelect: (result: GeocodeResult) => void;
  /** Opțional: valoarea inițială a input-ului */
  initialAddress?: string;
};

type MapboxFeature = {
  id: string;
  text: string;
  place_name: string;
  center: [number, number];
  place_type: string[];
  context?: { id: string; text: string }[];
};

export function AddressAutocomplete({
  mapboxToken,
  onSelect,
  initialAddress = '',
}: AddressAutocompleteProps) {
  const [address, setAddress] = useState(initialAddress);
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Referință pentru debounce
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Referință pentru a detecta click în afara listei de sugestii
  const containerRef = useRef<HTMLDivElement>(null);

  // Folosim useEffect pentru a rula autocomplete pe măsură ce address se schimbă
  useEffect(() => {
    if (!address.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    // Debounce de 300ms
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const encoded = encodeURIComponent(address.trim());
        const url =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json` +
          `?access_token=${mapboxToken}` +
          `&autocomplete=true&limit=5&country=ro`;

        const resp = await fetch(url);
        if (!resp.ok) {
          throw new Error(`Mapbox error: ${resp.status} ${resp.statusText}`);
        }
        const data = await resp.json();
        if (!data.features) {
          setSuggestions([]);
          setShowDropdown(false);
          setLoading(false);
          return;
        }
        setSuggestions(data.features);
        setShowDropdown(true);
      } catch (err: any) {
        setError(err.message || 'Eroare la geocodare.');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [address, mapboxToken]);

  // Detectăm click în afara container-ului ca să închidem dropdown-ul
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Când utilizatorul alege o sugestie
  const handleSelect = (feature: MapboxFeature) => {
    const [lng, lat] = feature.center;
    // Extragem orașul din context
    let cityName: string | null = null;
    if (feature.context) {
      const placeItem = feature.context.find((c) => c.id.startsWith('place.'));
      if (placeItem) {
        cityName = placeItem.text;
      }
    }
    if (!cityName && feature.place_type.includes('place')) {
      cityName = feature.text;
    }

    setAddress(feature.place_name);
    setSuggestions([]);
    setShowDropdown(false);

    onSelect({
      latitude: lat,
      longitude: lng,
      city: cityName,
      placeName: feature.place_name,
    });
  };

  return (
    <div ref={containerRef} className='relative w-full max-w-md'>
      <label htmlFor='address-autocomplete' className='mb-1 block font-medium'>
        Introduceți adresa:
      </label>
      <input
        id='address-autocomplete'
        type='text'
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          setError(null);
        }}
        onFocus={() => {
          if (suggestions.length > 0) {
            setShowDropdown(true);
          }
        }}
        placeholder='Strada, Nr., Localitate...'
        className='w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
      />
      {loading && (
        <div className='absolute top-10 right-3 animate-pulse text-gray-500'>
          Loading…
        </div>
      )}
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}

      {showDropdown && suggestions.length > 0 && (
        <ul className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md border bg-white shadow-lg'>
          {suggestions.map((feature) => (
            <li
              key={feature.id}
              onClick={() => handleSelect(feature)}
              className='cursor-pointer px-3 py-2 hover:bg-gray-100'>
              {feature.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
