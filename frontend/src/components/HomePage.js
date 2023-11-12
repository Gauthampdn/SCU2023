import React, { useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './HomePage.css';
import { useAuthContext } from "../hooks/useAuthContext";

const startIcon = new L.Icon({
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const endIcon = new L.Icon({
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const DraggableMarker = ({ content, initialPosition, onDrag }) => {
  const [position, setPosition] = useState(initialPosition);
  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = ref.current;
      if (marker != null) {
        const newPos = marker.getLatLng();
        setPosition(newPos);
        onDrag(newPos);
      }
    },
  }), [onDrag]);
  const ref = useRef(null);
  return position ? (
    <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={ref}>
      <Popup>{content}</Popup>
    </Marker>
  ) : null;
};

const HomePage = () => {
  const { user } = useAuthContext();
  const defaultCenter = { lat: user.start.lat.$numberDecimal, lng: user.start.lng.$numberDecimal };
  const [startPosition, setStartPosition] = useState(defaultCenter);
  const [endPosition, setEndPosition] = useState(defaultCenter);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState('');

  const handlePassengerClick = () => {
    setShowForm(true);
  };

  const handleContinue = () => {
    setLoading(true);
    // Implement the logic for what happens when "Continue" is clicked
  };

  const handleCancel = () => {
    setShowForm(false);
    setPrice('');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const updateStartPosition = (newPosition) => {
    setStartPosition(newPosition);
  };

  const updateEndPosition = (newPosition) => {
    setEndPosition(newPosition);
  };

  return (
    <div className='Driver'>
      <div className="pull-tab" onClick={toggleSidebar}> </div>
      <div className="instructions">
        Pick Start/End Point
      </div>
      
      <MapContainer center={[user.start.lat.$numberDecimal, user.start.lng.$numberDecimal]} zoom={13} style={{ height: '100vh', width: '100vw' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DraggableMarker content="Start Point" initialPosition={startPosition} onDrag={updateStartPosition} icon={startIcon} />
        <DraggableMarker content="End Point" initialPosition={endPosition} onDrag={updateEndPosition} icon={endIcon} />
      </MapContainer>

      {sidebarVisible && (
        <div className="sidebar">
          {!showForm ? (
            <>
              <button className="sidebar-button driver">Driver</button>
              <button className="sidebar-button passenger" onClick={handlePassengerClick}>Passenger</button>
            </>
          ) : (
            <>
              {loading ? (
          <div className="loading">
            <span className="loading-text">Finding Drivers...</span>
            <div className="dot-container">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        ) : (
                <>
                  <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Fare" defaultValue= "0.00" />
                  <button className="continue-button" onClick={handleContinue}>Continue</button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
