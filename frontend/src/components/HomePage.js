import React, { useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './HomePage.css'
import { useAuthContext } from "../hooks/useAuthContext";



const startIcon = new L.Icon({
  iconUrl: "/Pin-location.png", // Replace with your start point icon URL
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const endIcon = new L.Icon({
  iconUrl: "/Pin-location.png", // Replace with your end point icon URL
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});


const DraggableMarker = ({ content, initialPosition, onDrag }) => {
  const [position, setPosition] = useState(initialPosition);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = ref.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setPosition(newPos);
          onDrag(newPos);
        }
      },
    }),
    [onDrag],
  );

  const ref = useRef(null);

  // Only render the Marker if position is not null
  return position ? (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={ref}>
      <Popup>{content}</Popup>
    </Marker>
  ) : null;
};

const HomePage = () => {

  const { user } = useAuthContext();

  const defaultCenter = { lat: user.start.lat.$numberDecimal, lng: user.start.lng.$numberDecimal };


  console.log(user.start.lat.$numberDecimal);
  console.log(user.start.lng.$numberDecimal);

  const [startPosition, setStartPosition] = useState(defaultCenter);
  const [endPosition, setEndPosition] = useState(defaultCenter);
  const [isSettingEndPoint, setIsSettingEndPoint] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    if (endPosition) {
      setShowSidebar(!showSidebar);
    }
  };
  const updateStartPosition = (newPosition) => {
    setStartPosition(newPosition);
    console.log(startPosition)

  };

  const updateEndPosition = (newPosition) => {
    setEndPosition(newPosition);
    console.log(endPosition);
    };


  return (
    <div className='Driver'>
      <div className="instructions">
        {isSettingEndPoint ? 'Pick the End Point' : 'Pick the Start Point'}
      </div>
      <MapContainer center={[user.start.lat.$numberDecimal, user.start.lng.$numberDecimal]} zoom={13} style={{ height: '100vh', width: '100vw' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <DraggableMarker
          content="Start Point"
          initialPosition={startPosition}
          onDrag={updateStartPosition}
          icon={startIcon}
        />
        <DraggableMarker
          content="End Point"
          initialPosition={endPosition}
          onDrag={updateEndPosition}
          icon={endIcon}
        />
      </MapContainer>

      {showSidebar && (
        <div className="sidebar">
          <p>Start Point: {JSON.stringify(startPosition)}</p>
          <p>End Point: {JSON.stringify(endPosition)}</p>
          <button onClick={toggleSidebar}>Close Sidebar</button>
          <button>Driver</button>
          <button>Passenger</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;