import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Driver.css';

const Driver = () => {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [isSettingEndPoint, setIsSettingEndPoint] = useState(false);
  const isSettingEndPointRef = useRef(isSettingEndPoint); // useRef to track the current state

  const [showSidebar, setShowSidebar] = useState(false);
  const [midPoint, setMidPoint] = useState(null);
  const [settingStart, setSettingStart] = useState(true);
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);

  const [mapClicksDisabled, setMapClicksDisabled] = useState(false);


  // Function to calculate midpoint
  const calculateMidpoint = (point1, point2) => {
    return {
      lat: (point1.lat + point2.lat) / 2,
      lng: (point1.lng + point2.lng) / 2
    };
  };

  // Fetch passengers based on the midpoint
  const fetchPassengers = () => {
    console.log('Start Point:', startPoint);
    console.log('End Point:', endPoint);
    // Existing API call logic here (if any)
  };

  useEffect(() => {
    if (startPoint && endPoint) {
      setMidPoint(calculateMidpoint(startPoint, endPoint));
    }
  }, [startPoint, endPoint]);


  useEffect(() => {
    isSettingEndPointRef.current = isSettingEndPoint; // Update ref whenever state changes
  }, [isSettingEndPoint]);



  const handleApiLoaded = (map, maps) => {
    map.addListener("click", (e) => {
      if (mapClicksDisabled) return; // Prevent handling clicks if map clicks are disabled

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const position = { lat, lng };

      if (!isSettingEndPointRef.current) {
        setStartPoint(position);

        // Remove the existing start marker if it exists
        if (startMarker) startMarker.setMap(null);

        const marker = new maps.Marker({
          position,
          map,
          label: "S"
        });

        setStartMarker(marker);
        setIsSettingEndPoint(true); // Toggle to set end point next
      } else {
        setEndPoint(position);

        // Remove the existing end marker if it exists
        if (endMarker) endMarker.setMap(null);

        const marker = new maps.Marker({
          position,
          map,
          label: "E"
        });

        setEndMarker(marker);
        setIsSettingEndPoint(false); // Reset for next time
        setShowSidebar(true); // Open sidebar after setting end point
        
      }
    });
  };


  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {settingStart ? (
        <div className="instructions">Pick the Start Point</div>
      ) : (
        <div className="instructions">Pick the End Point</div>
      )}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS }} // Replace with your Google Maps API key
        defaultCenter={{ lat: 37.34, lng: -121.938130 }}
        defaultZoom={16}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {/* Render markers for startPoint and endPoint */}
        {startPoint && (
          <div 
            lat={startPoint.lat} 
            lng={startPoint.lng}
            className="marker start-marker"
          >
            Start
          </div>
        )}
        {endPoint && (
          <div 
            lat={endPoint.lat} 
            lng={endPoint.lng}
            className="marker end-marker"
          >
            End
          </div>
        )}
      </GoogleMapReact>
      {!isSettingEndPoint && (
        <button className="next-button" onClick={fetchPassengers}>
        Next <FontAwesomeIcon icon={faArrowRight} />
      </button>
      )}

      {showSidebar && (
        <div className="sidebar">
          {/* Sidebar content goes here */}
          <p>Start Point: {JSON.stringify(startPoint)}</p>
          <p>End Point: {JSON.stringify(endPoint)}</p>
        </div>
      )}
      
    </div>
  );
};


export default Driver;
