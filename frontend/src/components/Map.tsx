import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Product } from '../types';

interface MapProps {
  products: Product[];
  hoveredProduct: Product | null;
}

const Map: React.FC<MapProps> = ({ products, hoveredProduct }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGFnZXN0dWRpbyIsImEiOiJjbTlrM3o5eXUwaWVjMmtzZ3ltcDAwazR6In0.tLphe6RSpLB4jbjdYuBg4g';
    
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        center: [-74.5, 40],
        zoom: 9
      });
      
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add markers for products
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markers.forEach(marker => marker.remove());
    const newMarkers: mapboxgl.Marker[] = [];

    // Add markers for each product
    products.forEach((product) => {
      const { lat, lng } = product.location;
      
      // Create element for marker
      const el = document.createElement('div');
      el.className = 'marker';
      
      // Add price to marker
      el.textContent = `$${product.price.toFixed(0)}`;
      
      // Store product data on element for easier identification
      el.setAttribute('data-product-id', product.id?.toString() || '');
      el.setAttribute('data-lat', lat.toString());
      el.setAttribute('data-lng', lng.toString());
      
      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map.current!);
      
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // Adjust map bounds to fit all markers
    if (products.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      products.forEach(product => {
        bounds.extend([product.location.lng, product.location.lat]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [products]);

  // Highlight marker when product is hovered
  useEffect(() => {
    // Reset all markers first
    markers.forEach(marker => {
      const el = marker.getElement();
      el.classList.remove('hovered');
    });

    if (!hoveredProduct) {
      return;
    }

    const hoveredLat = hoveredProduct.location.lat;
    const hoveredLng = hoveredProduct.location.lng;

    markers.forEach(marker => {
      const el = marker.getElement();
      const markerLat = parseFloat(el.getAttribute('data-lat') || '0');
      const markerLng = parseFloat(el.getAttribute('data-lng') || '0');
      
      // Use a small tolerance for floating point comparison
      const tolerance = 0.0001;
      if (Math.abs(markerLat - hoveredLat) < tolerance && 
          Math.abs(markerLng - hoveredLng) < tolerance) {
        el.classList.add('hovered');
      }
    });
  }, [hoveredProduct, markers]);

  return (
    <div className="h-full w-full sticky top-0">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default Map;