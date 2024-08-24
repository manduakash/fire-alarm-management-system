import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 10,
    width: '100%',
    height: '500px'
  });

  const [markers, setMarkers] = useState([
    { id: 1, latitude: 37.8, longitude: -122.4, name: 'Marker 1' },
    { id: 2, latitude: 37.9, longitude: -122.5, name: 'Marker 2' },
    { id: 3, latitude: 38.0, longitude: -122.6, name: 'Marker 3' }
  ]);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMoveToMarker = (marker) => {
    setViewport({
      ...viewport,
      latitude: marker.latitude,
      longitude: marker.longitude,
      zoom: 14
    });
    setSelectedMarker(marker);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken='pk.eyJ1IjoibWFuZHVha2FzaDAzIiwiYSI6ImNtMDczY2NmNDBqZHcycXM0dzJtNnE5MHYifQ.-7ziTwgupnEPX3P6nxLdCw'
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          latitude={marker.latitude}
          longitude={marker.longitude}
        >
          <button
            style={{ background: 'red', borderRadius: '50%', cursor: 'pointer' }}
            onClick={() => handleMoveToMarker(marker)}
          >
            📍
          </button>
        </Marker>
      ))}

      {selectedMarker && (
        <Popup
          latitude={selectedMarker.latitude}
          longitude={selectedMarker.longitude}
          onClose={() => setSelectedMarker(null)}
        >
          <div>{selectedMarker.name}</div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default MapComponent;
