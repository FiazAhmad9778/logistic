import { useRef } from 'react';
import Map, { MapRef, GeolocateControl, FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const TOKEN = import.meta.env.VITE_PORTAL_MAP_BOX_API_KEY;

const SearchableMap = () => {
  const mapRef = useRef<MapRef>(null);
  return (
    <div>
      <h1>Use the search bar to find a location on the map</h1>
      <Map
        ref={mapRef}
        attributionControl={false}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ height: '100%', zIndex: 0 }}
      >
        <GeolocateControl />
        <FullscreenControl />
      </Map>
    </div>
  );
};
export default SearchableMap;
