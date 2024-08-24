import React, { useState, useEffect, useMemo } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = (props) => {
  const [selectedPlace, setSelectedPlace] = useState({});
  const [activeMarker, setActiveMarker] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);


  useEffect(() => {
    setSomeState(props.someProp);
    // Perform side effects or data fetching here if needed
    MapContainer.defaultProps = {
        zoom: 14,
        markerName: 'Current location',
      };
  }, [props.someProp]); // Runs only when someProp changes
  const onMarkerClick = (props, marker) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };


  return (
    <Map google={props.google} zoom={props.zoom}>
      <Marker
        onClick={onMarkerClick}
        name={props.markerName}
      />
      <InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={onInfoWindowClose}
      >
        <div>
          <h1>{selectedPlace.name}</h1>
        </div>
      </InfoWindow>
    </Map>
  );
};



export default GoogleApiWrapper({
  apiKey: ("AIzaSyBJtck0O9BxXGxOuhxeYSQOMgvmaJeF4NY"),
})(MapContainer);
