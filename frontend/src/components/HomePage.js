import React, { useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
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
  const { user, dispatch } = useAuthContext();

  const defaultStartCenter = { lat: user.start.lat.$numberDecimal, lng: user.start.lng.$numberDecimal };
  const defaultEndCenter = { lat: user.end.lat.$numberDecimal, lng: user.end.lng.$numberDecimal };
  const [startPosition, setStartPosition] = useState(defaultStartCenter);
  const [endPosition, setEndPosition] = useState(defaultEndCenter);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState('');
  const [processedCoordinates, setProcessedCoordinates] = useState([]);


  const handlePassengerClick = () => {
    setShowForm(true);
  };

  function flipArrayValues(array) {
    return array.map(subArray => {
      if (Array.isArray(subArray) && subArray.length === 2) {
        return [subArray[1], subArray[0]];
      }
      return subArray;
    });
  }


const handleDriverClick = async () => {
  try {
    const payload = {
      start: startPosition,
      end: endPosition
    };

    const response = await fetch('http://localhost:4000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const originalCoordinates = data.result.trip.routes[0].points.coordinates;

    
    const flippedCoordinates = flipArrayValues(originalCoordinates);

    setProcessedCoordinates(flippedCoordinates);
    console.log(flippedCoordinates); // Use processedCoordinates as needed


  } catch (error) {
    console.error('Error:', error);
  }
};

  
  

  const handleContinue = () => {
    setLoading(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setPrice('');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const redOptions = { color: 'red' }


  const updateStartPosition = async (newPosition) => {
    console.log(newPosition);

    setStartPosition(newPosition);

    const response = await fetch(`http://localhost:4000/api/person/${user._id}`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start: newPosition })
    });

    if (response.ok) {
      const updated = await response.json();
      dispatch({ type: "LOGIN", payload: updated })
    }
};

const updateEndPosition = async (newPosition) => {
    console.log(newPosition);
    setEndPosition(newPosition);

    const response = await fetch(`http://localhost:4000/api/person/${user._id}`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ end: newPosition })
    });

    if (response.ok) {
      const updated = await response.json();
      dispatch({ type: "LOGIN", payload: updated })
    }
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
        
        {processedCoordinates.length > 0 && <Polyline pathOptions= {redOptions} positions={processedCoordinates} color="blue" />}
      </MapContainer>

      {sidebarVisible && (
        <div className="sidebar">
          {!showForm ? (
            <>
              <button className="sidebar-button driver" onClick={handleDriverClick}>Driver</button>
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
                  <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Fare" defaultValue="0.00" />
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
