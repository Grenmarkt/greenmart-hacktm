/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  products: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    latitude: number;
    longitude: number;
    // …any other fields you might have…
  }>;
  hoveredProduct: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    latitude: number;
    longitude: number;
    // …any other fields…
  } | null;
}

const Map: React.FC<MapProps> = ({ products, hoveredProduct }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // We’ll store markers in a ref keyed by product.id
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [mapInitialized, setMapInitialized] = useState(false);

  // 1️⃣ Initialize the map once
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoidGFnZXN0dWRpbyIsImEiOiJjbTlrM3o5eXUwaWVjMmtzZ3ltcDAwazR6In0.tLphe6RSpLB4jbjdYuBg4g';

    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        // You can set any default center/zoom; we’ll fitBounds after adding markers
        center: [-122.4194, 37.7749], // default to San Francisco coordinates
        zoom: 10,
        style: 'mapbox://styles/mapbox/streets-v11',
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        setMapInitialized(true);
      });
    }

    return () => {
      // Cleanup all markers on unmount
      Object.values(markersRef.current).forEach((marker) => {
        marker.remove();
      });
      markersRef.current = {};

      // Cleanup the map itself
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // 2️⃣ Add/update/remove markers whenever `products` or `mapInitialized` changes
  useEffect(() => {
    if (!map.current || !mapInitialized) return;

    // Build a set of current product IDs
    const currentProductIds = new Set<string>();

    products.forEach((product) => {
      const productId = product.id;
      currentProductIds.add(productId);

      // If we already have a marker for this ID, just update its position
      if (markersRef.current[productId]) {
        markersRef.current[productId].setLngLat([
          product.longitude,
          product.latitude,
        ]);
      } else {
        // Otherwise, create a new marker element
        const el = document.createElement('div');
        el.className = 'marker';
        // Show the price inside the marker
        el.textContent = `${product.price.toFixed(0)}`;
        // Tag with product ID
        el.setAttribute('data-product-id', productId);

        const marker = new mapboxgl.Marker(el)
          .setLngLat([product.longitude, product.latitude])
          .addTo(map.current!);

        markersRef.current[productId] = marker;
      }
    });

    // Remove any markers that no longer correspond to a product
    Object.keys(markersRef.current).forEach((existingId) => {
      if (!currentProductIds.has(existingId)) {
        markersRef.current[existingId]!.remove();
        delete markersRef.current[existingId];
      }
    });

    // After adding/updating markers, adjust the map bounds to fit them all
    if (products.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      products.forEach((product) => {
        bounds.extend([product.longitude, product.latitude]);
      });
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 12 });
    }
  }, [products, mapInitialized]);

  // 3️⃣ Highlight (and optionally fly to) the hovered product’s marker
  useEffect(() => {
    if (!mapInitialized) return;

    // First, clear any existing "hovered" class
    Object.values(markersRef.current).forEach((marker) => {
      marker.getElement().classList.remove('hovered');
    });

    if (!hoveredProduct || !map.current) {
      return;
    }

    const productId = hoveredProduct.id;
    const hoveredMarker = markersRef.current[productId];
    if (hoveredMarker) {
      hoveredMarker.getElement().classList.add('hovered');

      // Center/fly to the hovered product
      map.current.flyTo({
        center: [hoveredProduct.longitude, hoveredProduct.latitude],
        zoom: 13,
        duration: 800,
        essential: true,
      });
    }
  }, [hoveredProduct, mapInitialized]);

  return (
    <div className='sticky top-0 h-full w-full'>
      <div ref={mapContainer} className='h-full w-full' />
    </div>
  );
};

export default Map;
