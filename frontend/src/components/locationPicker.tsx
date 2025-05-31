import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Loader2, Navigation } from 'lucide-react';
import { toast } from 'sonner';

// Setează token-ul Mapbox (înlocuiește cu token-ul tău)

interface LocationPickerProps {
  profileEdit: {
    address: string;
    lat: string;
    lng: string;
  };
  setProfileEdit: (profile: any) => void;
  updateSellerProfile: () => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  profileEdit,
  setProfileEdit,
  updateSellerProfile
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Inițializare hartă
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [profileEdit.lng ? parseFloat(profileEdit.lng) : 21.2287, profileEdit.lat ? parseFloat(profileEdit.lat) : 45.7494], 
      zoom: profileEdit.lat && profileEdit.lng ? 15 : 6
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Adaugă marker dacă există coordonate
      if (profileEdit.lat && profileEdit.lng) {
        addMarker(parseFloat(profileEdit.lng), parseFloat(profileEdit.lat));
      }
    });

    // Event listener pentru click pe hartă
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      updateLocation(lng, lat);
      reverseGeocode(lng, lat);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Adaugă sau actualizează marker-ul
  const addMarker = (lng: number, lat: number) => {
    if (marker.current) {
      marker.current.remove();
    }

    marker.current = new mapboxgl.Marker({ color: '#ef4444' })
      .setLngLat([lng, lat])
      .addTo(map.current!);
  };

  // Actualizează locația în state
  const updateLocation = (lng: number, lat: number) => {
    setProfileEdit({
      ...profileEdit,
      lat: lat.toFixed(6),
      lng: lng.toFixed(6)
    });
    addMarker(lng, lat);
  };

  // Reverse geocoding pentru a obține adresa
  const reverseGeocode = async (lng: number, lat: number) => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidGFnZXN0dWRpbyIsImEiOiJjbTlrM3o5eXUwaWVjMmtzZ3ltcDAwazR6In0.tLphe6RSpLB4jbjdYuBg4g';

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}&language=ro`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        setProfileEdit({
          ...profileEdit,
          address: address,
          lat: lat.toFixed(6),
          lng: lng.toFixed(6)
        });
      }
    } catch (error) {
      console.error('Eroare la reverse geocoding:', error);
    }
  };

  // Obține locația curentă din browser
  const getCurrentLocation = () => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidGFnZXN0dWRpbyIsImEiOiJjbTlrM3o5eXUwaWVjMmtzZ3ltcDAwazR6In0.tLphe6RSpLB4jbjdYuBg4g';
    if (!navigator.geolocation) {
      toast.error("Geolocation nu este suportat de acest browser.");
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Actualizează harta să se centreze pe locația curentă
        if (map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 15
          });
        }

        updateLocation(longitude, latitude);
        reverseGeocode(longitude, latitude);
        setIsLoadingLocation(false);

        toast.success("Locația ta a fost găsită!");
      },
      (error) => {
        setIsLoadingLocation(false);
        let errorMessage = "Nu s-a putut obține locația.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Accesul la locație a fost refuzat.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informațiile despre locație nu sunt disponibile.";
            break;
          case error.TIMEOUT:
            errorMessage = "Cererea pentru locație a expirat.";
            break;
        }

        toast.error(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Căutare locație după adresă
  const searchLocation = async () => {
    if (!profileEdit.address.trim()) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(profileEdit.address)}.json?access_token=${mapboxgl.accessToken}&country=RO&language=ro`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        
        if (map.current) {
          map.current.flyTo({
            center: [lng, lat],
            zoom: 15
          });
        }

        updateLocation(lng, lat);
        
        toast.success("Locația a fost găsită!");
      } else {
        toast.error("Nu s-a găsit nicio locație pentru această adresă.");
      }
    } catch (error) {
      toast.error("Eroare la căutarea locației.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Locația Fermei
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Hartă */}
        <div className="space-y-2">
          <Label>Selectează locația pe hartă</Label>
          <div 
            ref={mapContainer} 
            className="w-full h-64 rounded-lg border"
            style={{ minHeight: '300px' }}
          />
          <p className="text-sm text-muted-foreground">
            Apasă pe hartă pentru a selecta locația sau folosește butoanele de mai jos.
          </p>
        </div>

        {/* Butoane pentru locație */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={getCurrentLocation}
            disabled={isLoadingLocation || !mapLoaded}
            className="flex items-center gap-2"
          >
            {isLoadingLocation ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4" />
            )}
            Locația Mea
          </Button>
          <Button 
            variant="outline" 
            onClick={searchLocation}
            disabled={!profileEdit.address.trim() || !mapLoaded}
          >
            Caută Adresa
          </Button>
        </div>

        {/* Input-uri pentru adresă și coordonate */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Adresa</Label>
            <Input
              value={profileEdit.address}
              onChange={(e) => 
                setProfileEdit({...profileEdit, address: e.target.value})}
              placeholder="ex. Timișoara, Timiș"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  searchLocation();
                }
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Latitudine</Label>
              <Input
                type="number"
                step="0.000001"
                value={profileEdit.lat}
                onChange={(e) => 
                  setProfileEdit({...profileEdit, lat: e.target.value})}
                placeholder="45.7494"
              />
            </div>
            <div className="grid gap-2">
              <Label>Longitudine</Label>
              <Input
                type="number"
                step="0.000001"
                value={profileEdit.lng}
                onChange={(e) => 
                  setProfileEdit({...profileEdit, lng: e.target.value})}
                placeholder="21.2287"
              />
            </div>
          </div>
        </div>

        <Button onClick={updateSellerProfile} className="w-full">
          Salvează Locația
        </Button>
      </CardContent>
    </Card>
  );
};

export default LocationPicker;